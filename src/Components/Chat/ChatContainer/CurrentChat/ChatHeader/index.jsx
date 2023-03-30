import React from "react";
import styles from "./index.module.css";

function ChatHeader({ currentChat }) {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.avatar}>
        <img src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`} alt={`Avatar's ${currentChat?.username}`} />
      </div>
      <div className={styles.username}>
        <h3>{currentChat?.username}</h3>
      </div>
    </div>
  );
}

export default ChatHeader;
