import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { Buffer } from "buffer";
import Preloader from "Components/Shared/Preloader";
import ButtonText from "Components/Shared/Button/ButtonText";
import { ToastContainer, toast } from "react-toastify";
import jwt_decoded from "jwt-decode";

function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Si se edita o elimina el token, nos saca de la app
  useEffect(() => {
    const handleStorageChange = (event) => {
      if(event.key === "token") {
        setCurrentUser(undefined);
        localStorage.removeItem("token")
        navigate("/auth/login");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/login");
    } else {
      const token = JSON.parse(localStorage.getItem("token"));
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser?.avatarImage === "") {
      const data = [];
      const getAvatars = async () => {
        try {
          for (let i = 0; i < 4; i++) {
            const response = await fetch(
              `${process.env.REACT_APP_MULTIAVATAR_API}/${Math.round(Math.random() * 1000)}`
            );
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
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Select an avatar please", {
        position: "bottom-right",
        theme: "dark",
      });
    } else {
      const avatarImage = avatars[selectedAvatar];
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/setAvatar/${currentUser._id}`, {
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
        navigate("/");
      }
    }
  };

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
