import { useState } from "react";
import styles from "./App.module.css";
import Chat from "./components/Chat/Chat";
import Controls from "./Controls/Controls";
import { Assistant } from "./assistants/googleai";

const App = () => {
  const [messages, setMessages] = useState([]);
  const assistant = new Assistant();

  function addMessage(message) {
    setMessages((prev) => [...prev, message]);
  }

  async function handleContentSend(content) {
    // alert(content)
      addMessage({ role: "user", content });
    try {
      const result = await assistant.chat(content);
      addMessage({ role: "assistant", content: result });
    } catch (err) {
      addMessage({ role: "system", content: "Sorry, something went wrong. Please try again." });
      console.log(err)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="./chat-bot.png" alt="" />
        <h2 className={styles.Title}>Mero Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
        <Controls onSendMessage={handleContentSend} />
      </div>
    </div>
  );
};

export default App;
