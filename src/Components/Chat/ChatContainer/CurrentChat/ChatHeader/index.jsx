import React from "react";
import styles from "./index.module.css";
import avatarDefault from "assets/defaultuser.png"

function ChatHeader({ currentChat }) {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.avatar}>
        <img src={currentChat?.avatarImage ? `data:image/svg+xml;base64,${currentChat?.avatarImage}` : avatarDefault} alt={`Avatar's ${currentChat?.username}`} />
      </div>
      <div className={styles.username}>
        <h3>{currentChat?.username}</h3>
      </div>
    </div>
  );
}

export default ChatHeader;
