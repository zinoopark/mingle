import React from "react";
import styles from "./SmallButton.module.css";
import { Roboto_Serif } from "next/font/google";

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--roboto-serif",
});

export default function SmallButton(props: {
  buttonText?: string;
  imgUrl?: string;
  isSelected?: boolean;
  handlePopupButtonClick?: () => void;
}) {
  return (
    <div className={`${styles.layout} ${robotoSerif.variable}`}>
      {props.imgUrl && <img src={props.imgUrl} alt="button image" />}
      {props?.buttonText && (
        <button
          onClick={props.handlePopupButtonClick}
          className={props.isSelected ? styles.selected : styles.smallButton}
        >
          {props.buttonText}
        </button>
      )}
    </div>
  );
}
