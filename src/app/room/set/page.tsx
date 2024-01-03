import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import SmallButton from "@/components/common/SmallButton/SmallButton";
import LargeButton from "@/components/common/LargeButton/LargeButton";
import RoomSettingInput from "@/components/room/RoomSettingInput";
import React from "react";
import styles from "./page.module.css";

export default function Set() {
  return (
    <>
      <CommonHeader
        headerText={`SET YOUR\n MINGLE'S RULE.`}
        align="center"
      ></CommonHeader>
      <RoomSettingInput />
      <SmallButton buttonText="KeyWords" />
      <div className={styles.buttonLayout}>
        <LargeButton buttonText="Invite" />
      </div>
    </>
  );
}
