import React from "react";
import styles from "./LargeButton.module.css";

export default function LargeButton(props: {
  buttonText?: string;
  imgUrl?: string;
}) {
  return (
    <div className={styles.layout}>
      {props.imgUrl && <img src={props.imgUrl} alt="button image" />}
      {props?.buttonText && (
        <button className={styles.LargeButton}>{props.buttonText}</button>
      )}
    </div>
  );
}
