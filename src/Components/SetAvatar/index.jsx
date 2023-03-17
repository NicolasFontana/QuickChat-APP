import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Buffer } from "buffer";
import Preloader from "Components/Shared/Preloader";
import ButtonText from "Components/Shared/Button/ButtonText";
import { ToastContainer, toast } from "react-toastify";

function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState()
  const [isLoading, setIsLoading] = useState(true);

  const api = "https://api.multiavatar.com";
  const setProfilePicture = () => {
    console.log('asd')
    console.log(selectedAvatar)
    if(selectedAvatar === undefined) {
      toast.error('Select an avatar please', {
        position: "bottom-right",
        theme: "dark"
      })
    }
  }
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
            <div key={index} className={`${styles.avatar} ${selectedAvatar === index ? styles.avatarSelected : ''}`} onClick={() => setSelectedAvatar(index)}>
              <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
            </div>
          );
        })}
      </div>
      <ButtonText type={'text'} label={'Select avatar'} clickAction={setProfilePicture} />
      <ToastContainer />
    </div>
  );
}

export default SetAvatar;
