import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { Buffer } from "buffer";
import Preloader from "Components/Shared/Preloader";
import ButtonText from "Components/Shared/Button/ButtonText";
import { ToastContainer, toast } from "react-toastify";

function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const api = "https://api.multiavatar.com";

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/auth/login");
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"))
      if(user.avatarImage !== "") {
        navigate("/")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Select an avatar please", {
        position: "bottom-right",
        theme: "dark",
      });
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const avatarImage = avatars[selectedAvatar];
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/setAvatar/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatarImage,
        }),
      });
      const userUpdated = await response.json();
      if (userUpdated.error === true) {
        toast.error(userUpdated.message, {
          position: "bottom-right",
          theme: "dark",
        });
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(userUpdated.data));
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const data = [];
    const getAvatars = async () => {
      try {
        for (let i = 0; i < 4; i++) {
          const response = await fetch(`${api}/${Math.round(Math.random() * 1000)}`);
          const image = await response.text();
          const buffer = Buffer(image);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAvatars();
  }, []);

  return isLoading ? (
    <Preloader>Loading avatars...</Preloader>
  ) : (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className={styles.avatars}>
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`${styles.avatar} ${selectedAvatar === index ? styles.avatarSelected : ""}`}
              onClick={() => setSelectedAvatar(index)}
            >
              <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
            </div>
          );
        })}
      </div>
      <ButtonText type={"text"} label={"Select avatar"} clickAction={setProfilePicture} />
      <ToastContainer />
    </div>
  );
}

export default SetAvatar;
