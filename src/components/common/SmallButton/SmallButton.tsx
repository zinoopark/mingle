import React from "react";
import styles from "./SmallButton.module.css";

export default function SmallButton(props: {
  buttonText?: string;
  imgUrl?: string;
}) {
  return (
    <div className={styles.layout}>
      {props.imgUrl && <img src={props.imgUrl} alt="button image" />}
      {props?.buttonText && (
        <button className={styles.SmallButton}>{props.buttonText}</button>
      )}
    </div>
  );
}
