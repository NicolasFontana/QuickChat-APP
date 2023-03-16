import React from "react";
import styles from '../buttons.module.css'

function ButtonText({ clickAction, type, label }) {
  return <button type={type} className={styles.buttonText} onClick={clickAction}>{label}</button>;
}

export default ButtonText;
