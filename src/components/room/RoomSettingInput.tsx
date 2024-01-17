import React from "react";
import styles from "./RoomSettingInput.module.css";
import UpDownNumberInput from "../common/UpDownNumberInput/UpDownNumberInput";

export default function RoomSettingInput(props: { children: React.ReactNode }) {
  return <div className={styles.layout}>{props.children}</div>;
}
