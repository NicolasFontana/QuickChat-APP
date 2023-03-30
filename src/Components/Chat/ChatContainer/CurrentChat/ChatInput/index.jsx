import React, { useState } from "react";
import styles from "./index.module.css";
import { GrEmoji } from "react-icons/gr";
import { MdSend } from "react-icons/md";
import Picker from "emoji-picker-react";

function ChatInput({ handleMessage }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojis = (emoji) => {
    const msg = message.concat(emoji.emoji);
    setMessage(msg);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(message.length > 0) {
      handleMessage(message)
      setMessage('')
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.containerEmoji}>
        <GrEmoji onClick={() => setShowEmoji(!showEmoji)} />
        <div className={styles.emojiPicker}>
          {showEmoji && <Picker theme="dark" onEmojiClick={handleEmojis} />}
        </div>
      </div>
      <form className={styles.containerForm} onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Type a message" value={message} onChange={handleChange}></input>
        <button type="submit" className={styles.submit} >
          <MdSend />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
