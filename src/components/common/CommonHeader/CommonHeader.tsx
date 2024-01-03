import React from "react";
import styles from "./CommonHeader.module.css";

export default function CommonHeader(props: {
  headerText: string;
  align?: "center" | "left" | "right";
}) {
  const textArray = props.headerText.split("\n");

  return (
    <div className={styles.header}>
      <h1 style={props.align ? { textAlign: props.align } : {}}>
        {textArray.map((text, index) => {
          return (
            <span key={index}>
              {text}
              <br />
            </span>
          );
        })}
      </h1>
    </div>
  );
}
