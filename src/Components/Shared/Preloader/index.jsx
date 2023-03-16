import React from "react";
import styles from "./index.module.css";

function Preloader({children}) {
  return (
    <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.loaderOutter}></div>
          <div className={styles.loaderInner}></div>
        </div>
        {children}
    </div>
  );
}

export default Preloader;
