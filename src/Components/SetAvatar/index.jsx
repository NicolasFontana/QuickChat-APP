import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Buffer } from "buffer";
import Preloader from "Components/Shared/Preloader";

function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const api = "https://api.multiavatar.com";
  useEffect(() => {
    const data = [];
    const getAvatars = async () => {
      try {
        for (let i = 0; i < 2; i++) {
          const response = await fetch(`${api}/${Math.round(Math.random() * 1000)}`);
          const image = await response.text();
          const buffer = Buffer(image);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAvatars();
  }, []);
  return isLoading ? (
    <>
      <Preloader>Loading avatars...</Preloader>
    </>
  ) : (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className={styles.avatars}>
        {avatars.map((avatar, index) => {
          return (
            <div key={index} className={styles.avatar}>
              <span>1</span>
              <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SetAvatar;
