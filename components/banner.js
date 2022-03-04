import React from "react";
import styles from "./banner.module.css";
export const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Cofee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local cofee shops</p>
      <div className={styles.buttonWrapper}>
        <button onClick={props.handleOnClick} className={styles.button}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};
