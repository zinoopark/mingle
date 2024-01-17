"use client";
import { useState } from "react";
import styles from "./UpDownNumberInput.module.css";

export default function UpDownNumberInput(props: {
  valueState: [number, any];
  backgroundColor?: "gray";
}) {
  const [value, setValue] = props.valueState;
  const buttonColor = props.backgroundColor === "gray" ? "white" : "gray";

  return (
    <div className={styles.layout}>
      <DownButton setValue={setValue} buttonColor={buttonColor}></DownButton>
      <input
        className={styles.input}
        value={value}
        minLength={1}
        maxLength={1}
        type="number"
        onChange={(e) => {
          const value = Number(e.target.value);
          if (isNaN(value)) return;
          if (value < 0) return;
          if (value > 999) return;

          setValue(value);
        }}
        disabled
      ></input>
      <UpButton setValue={setValue} buttonColor={buttonColor}></UpButton>
    </div>
  );
}

function UpButton(props: { setValue: any; buttonColor: "white" | "gray" }) {
  const handleClickUpButton = () => {
    if (props.setValue === undefined) return;

    props.setValue((prev: number) => {
      const returnValue = prev + 1;
      if (returnValue < 2) return 2;
      if (returnValue > 9) return 9;

      return returnValue;
    });
  };

  return (
    <button onClick={handleClickUpButton} style={{ background: "transparent" }}>
      <img src={`/up_${props.buttonColor}_arrow.svg`}></img>
    </button>
  );
}

function DownButton(props: { setValue: any; buttonColor: "white" | "gray" }) {
  const handleClickDownButton = () => {
    if (props.setValue === undefined) return;

    props.setValue((prev: number) => {
      const returnValue = prev - 1;
      if (returnValue < 2) return 2;
      if (returnValue > 9) return 9;

      return returnValue;
    });
  };

  return (
    <button
      onClick={handleClickDownButton}
      style={{ background: "transparent" }}
    >
      <img
        src={`/up_${props.buttonColor}_arrow.svg`}
        style={{ transform: "scaleY(-1)" }}
      ></img>
    </button>
  );
}
