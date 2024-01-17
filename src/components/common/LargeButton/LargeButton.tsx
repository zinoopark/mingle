import React from "react";
import styles from "./LargeButton.module.css";

export default function LargeButton(props: {
  buttonText?: string;
  imgUrl?: string;
  isDisabled?: boolean;
}) {
  return (
    <div className={styles.layout}>
      {props.imgUrl && <img src={props.imgUrl} alt="button image" />}
      {props?.buttonText && (
        <button className={styles.largeButton} disabled={props.isDisabled}>
          {props.buttonText}
        </button>
      )}
    </div>
  );
}
