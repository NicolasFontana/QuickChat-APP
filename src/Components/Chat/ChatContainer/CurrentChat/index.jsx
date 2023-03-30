import React, { useState } from "react";
import styles from "./index.module.css";
import ChatHeader from './ChatHeader'
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

function CurrentChat({ currentChat, currentUser }) {
  const [messageSent, setMessageSent] = useState('')
  if(messageSent.length > 0) {
    console.log({
      from: currentUser._id,
      to: currentChat._id,
      message: messageSent
    })
  }
  return (
    <div className={styles.container}>
      <ChatHeader currentChat={currentChat}/>
      <ChatMessages />
      <ChatInput setMessageSent={setMessageSent} />
    </div>
  );
}

export default CurrentChat;
