import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";

function ChatMessages({ messages }) {
  const bottomRef = useRef()
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages]);
  return (
    <div className={styles.container}>
      {messages.map((msg, index) => {
        return (
          <div key={index} className={`${styles.message} ${msg.fromSelf ? styles.sender : styles.receiver}`}>
            <div className={styles.content}>
              <p>{msg.message}</p>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatMessages;
