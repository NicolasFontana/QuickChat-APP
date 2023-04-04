import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

function CurrentChat({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState("");

  useEffect(() => {
    const getAllMessages = async () => {
      const data = {
        from: currentUser._id,
        to: currentChat._id,
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/getAllMessages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();
      setMessages(dataResponse.data);
    };
    getAllMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  const handleMessage = async (messageSent) => {
    const data = {
      from: currentUser._id,
      to: currentChat._id,
      message: messageSent,
    };
    await fetch(`${process.env.REACT_APP_API_URL}/api/messages/addMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    socket.current.emit("send-msg", data);
    setMessages([...messages, { fromSelf: true, message: data.message }]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <div className={styles.container}>
      <ChatHeader currentChat={currentChat} />
      <ChatMessages messages={messages} />
      <ChatInput handleMessage={handleMessage} />
    </div>
  );
}

export default CurrentChat;
