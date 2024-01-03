"use client";
import { useState } from "react";
import styles from "./UpDownNumberInput.module.css";

export default function UpDownNumberInput(props: { backgroundColor?: "gray" }) {
  const buttonColor = props.backgroundColor === "gray" ? "white" : "gray";

  return (
    <div className={styles.layout}>
      <DownButton buttonColor={buttonColor}></DownButton>
      <input
        className={styles.input}
        minLength={1}
        maxLength={3}
        type="number"
      ></input>
      <UpButton buttonColor={buttonColor}></UpButton>
    </div>
  );
}

function UpButton(props: { buttonColor: "white" | "gray" }) {
  return (
    <button style={{ background: "transparent" }}>
      <img src={`/up_${props.buttonColor}_arrow.svg`}></img>
    </button>
  );
}

function DownButton(props: { buttonColor: "white" | "gray" }) {
  return (
    <button style={{ background: "transparent" }}>
      <img
        src={`/up_${props.buttonColor}_arrow.svg`}
        style={{ transform: "scaleY(-1)" }}
      ></img>
    </button>
  );
}
