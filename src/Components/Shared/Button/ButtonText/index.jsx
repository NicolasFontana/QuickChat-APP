import React from "react";
import styles from '../buttons.module.css'

function ButtonText({ type, label }) {
  return <button type={type} className={styles.buttonText}>{label}</button>;
}

export default ButtonText;
