import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Contacts from "./Contacts";
import ChatContainer from "./ChatContainer";
import { io } from "socket.io-client";
import jwt_decoded from "jwt-decode";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const socket = useRef();

  // Si se edita o elimina el token, nos saca de la app
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        setCurrentUser(undefined);
        localStorage.removeItem("token");
        navigate("/auth/login");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const decoded = jwt_decoded(token);
      const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${decoded.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: JSON.parse(localStorage.getItem("token")),
          },
        });
        if (!response.ok) {
          localStorage.removeItem("token");
          setCurrentUser(undefined);
          navigate("/auth/login");
        } else {
          const user = await response.json();
          setCurrentUser(user.data);
        }
      };
      getUser();
    } else {
      navigate("auth/login");
    }
  }, []);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL);
    if (currentUser) {
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.avatarImage !== "") {
        const fetchData = async () => {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/allUsers/${currentUser._id}`);
          const data = await response.json();
          setContacts(data.data);
        };
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
        <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
      </div>
    </div>
  );
}

export default Chat;
