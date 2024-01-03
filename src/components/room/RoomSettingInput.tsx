import React from "react";
import styles from "./RoomSettingInput.module.css";
import UpDownNumberInput from "../common/UpDownNumberInput/UpDownNumberInput";

export default function RoomSettingInput() {
  return (
    <div className={styles.layout}>
      <div>People</div>
      <div>
        <UpDownNumberInput></UpDownNumberInput>
      </div>
      <div>Lines</div>
      <div>
        <UpDownNumberInput backgroundColor={"gray"}></UpDownNumberInput>
      </div>
      <div>Turns</div>
      <div>
        <UpDownNumberInput></UpDownNumberInput>
      </div>
    </div>
  );
}
