import React, { useState } from "react";
import styles from "./Controls.module.css";

const Controls = ({ onSendMessage }) => {
  const [content, setContent] = useState("");

  function handleChange(e) {
    setContent(e.target.value);
  }
  function handleSubmit() {
    if(content.length > 0){
        onSendMessage(content);
        setContent("");
    }
  }
  function handleEnterPress(e){
    if(e.key === "Enter" && !e.shiftKey){
        e.preventDefault();
        handleSubmit();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <textarea
          className={styles.TextArea}
          value={content}
          onChange={handleChange}
          placeholder="Message the bot"
          name=""
          id=""
          onKeyDown={handleEnterPress}
        ></textarea>
      </div>
      <button className={styles.Button} onClick={handleSubmit}>
        {/* {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M1.5 4.5a.75.75 0 01.75-.75h19.5a.75.75 0 010 1.5H2.25A.75.75 0 011.5 4.5zM1.5 12a.75.75 0 01.75-.75h19.5a.75.75 0 010 1.5H2.25A.75.75 0 011.5 12zm0 7.5a.75.75 0 01.75-.75h19.5a.75.75 0 010 1.5H2.25a.75.75 0 01-.75-.75z"
            clip-rule="evenodd"
          />
        </svg> */}
        SEND
      </button>
    </div>
  );
};

export default Controls;
