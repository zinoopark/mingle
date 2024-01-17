"use client";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import styles from "./page.module.css";
import React from "react";
import LargeButton from "@/components/common/LargeButton/LargeButton";
import LogoBackground from "@/components/common/LogoBackground/LogoBackground";

export default function Wait() {
  return (
    <>
      <LogoBackground></LogoBackground>
      <CommonHeader
        headerText={`CREATE ROOM\n AND INVITE\n PEOPLE.`}
        align="center"
      ></CommonHeader>
      <div className={styles.button_layout}>
        <LargeButton buttonText="Create"></LargeButton>
      </div>
    </>
  );
}
