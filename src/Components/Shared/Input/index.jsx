import React from "react";
import styles from "./index.module.css";

const Input = ({ type, name, placeholder, register, error }) => {
  return (
    <div className={styles.containerInput}>
      <input
        className={error ? styles.inputError : styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
