import React from "react";
import styles from "./index.module.css";
import welcome from "assets/welcome.svg";

function Welcome({ currentUser }) {
  return (
    <div className={styles.container}>
      <img src={welcome} alt="" />
      <h2>Welcome, {currentUser?.username}!</h2>
      <p>Please select a chat to start messaging</p>
    </div>
  );
}

export default Welcome;
