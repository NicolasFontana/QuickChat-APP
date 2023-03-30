import React from "react";
import styles from "./index.module.css";

function ChatMessages({ messages }) {
  return (
    <div className={styles.container}>
      {messages.map((msg) => {
        return (
          <div className={`${styles.message} ${msg.fromSelf ? styles.sender : styles.receiver}`}>
            <div className={styles.content}>
              <p>{msg.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
