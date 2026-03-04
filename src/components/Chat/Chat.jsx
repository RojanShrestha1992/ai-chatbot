
import styles from "./Chat.module.css";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! I am Mero, your friendly chatbot. How can I assist you today?",
}

const Chat = ({ messages }) => {
  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE, ...messages].map(({ id, role, content }, index) => {
        return (
          <div className={styles.Message} key={id ?? index} data-role={role}>
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
