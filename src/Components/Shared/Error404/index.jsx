import React, { useEffect } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import ButtonText from "../Button/ButtonText";

function Error404() {
  let pageX = document.documentElement.clientWidth;
  let pageY = document.documentElement.clientHeight;
  let mouseY = 0;
  let mouseX = 0;

  useEffect(() => {
    function handleMouse(event) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mouseY = event.pageY;
      let yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mouseX = event.pageX / -pageX;
      let xAxis = -mouseX * 100 - 100;
      let ghostEyes = document.getElementsByClassName(`${styles.box__ghostEyes}`)[0];
      ghostEyes.style.transform = "translate(" + xAxis + "%,-" + yAxis + "%)";
    }
    document.addEventListener("mousemove", handleMouse);
    return () => {
      document.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.box__ghost}>
          <div className={styles.symbol}></div>
          <div className={styles.symbol}></div>
          <div className={styles.symbol}></div>
          <div className={styles.symbol}></div>
          <div className={styles.symbol}></div>
          <div className={styles.symbol}></div>
          <div className={styles.box__ghostContainer}>
            <div className={styles.box__ghostEyes}>
              <div className={styles.box__eyeLeft}></div>
              <div className={styles.box__eyeRight}></div>
            </div>
            <div className={styles.box__ghostBottom}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className={styles.box__ghostShadow}></div>
        </div>
        <div className={styles.box__description}>
          <div className={styles.box__descriptionContainer}>
            <div className={styles.box__descriptionTitle}>Whoops!</div>
            <div className={styles.box__descriptionText}>
              It seems like we couldn't find the page you were looking for
            </div>
          </div>
          <Link to="http://localhost:3000/" className={styles.buttonLink}>
            <ButtonText type="button" label="Go back" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error404;
