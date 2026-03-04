import { useRef, useState } from "react";
import styles from "./App.module.css";
import Chat from "./components/Chat/Chat";
import Controls from "./Controls/Controls";
import { Assistant } from "./assistants/googleai";

const App = () => {
  const [messages, setMessages] = useState([]);
  const assistantRef = useRef(null);

  function createMessageId() {
    if (globalThis.crypto?.randomUUID) {
      return globalThis.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  if (assistantRef.current == null) {
    assistantRef.current = new Assistant();
  }

  function addMessage(message) {
    setMessages((prev) => [...prev, message]);
  }

  function updateMessageContent(id, content) {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, content } : message
      )
    );
  }

  async function handleContentSend(content) {
    // alert(content)
      addMessage({ id: createMessageId(), role: "user", content });

    const assistantMessageId = createMessageId();
    addMessage({ id: assistantMessageId, role: "assistant", content: "" });

    try {
      await assistantRef.current.chatStream(content, (partialText) => {
        updateMessageContent(assistantMessageId, partialText);
      });
    } catch (err) {
      updateMessageContent(
        assistantMessageId,
        `Sorry, something went wrong: ${err?.message || "Please try again."}`
      );
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
