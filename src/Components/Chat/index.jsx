import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Contacts from "./Contacts";
import ChatContainer from './ChatContainer'

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("auth/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.avatarImage !== "") {
        const fetchData = async () => {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/allUsers/${currentUser._id}`);
          const data = await response.json();
          setContacts(data.data);
        }
        fetchData();
      } else {
        navigate("/setAvatar");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return (
    <div className={styles.container}>
      <div className={styles.containerChat}>
        <Contacts contacts={contacts} currentUser={currentUser} setCurrentChat={setCurrentChat} />
        <ChatContainer currentChat={currentChat}/>
      </div>
    </div>
  );
}

export default Chat;
