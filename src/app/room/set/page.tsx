"use client";

import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import SmallButton from "@/components/common/SmallButton/SmallButton";
import LargeButton from "@/components/common/LargeButton/LargeButton";
import RoomSettingInput from "@/components/room/RoomSettingInput";
import React, { useState } from "react";
import styles from "./page.module.css";
import UpDownNumberInput from "@/components/common/UpDownNumberInput/UpDownNumberInput";
import Popup from "@/components/popup/popup";

const mingleKeywordList = [
  "Party",
  "Pet",
  "Trash",
  "Jesus",
  "Love",
  "Fairy",
  "Friend",
  "American",
];

type KeywordType = (typeof mingleKeywordList)[number] | null;

export default function Set() {
  const [people, setPeople] = useState<number>(4);
  const [lines, setLines] = useState<number>(4);
  const [turns, setTurns] = useState<number>(4);
  const [keywords, setKeywords] = useState<KeywordType>(null);

  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const handlePopupButtonClick = () => {
    setOpenPopup(true);
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <CommonHeader
        headerText={`SET YOUR\n MINGLE'S RULE.`}
        align="center"
      ></CommonHeader>

      <div className={styles.input_layout}>
        <RoomSettingInput>
          <div>People</div>
          <div>
            <UpDownNumberInput
              valueState={[people, setPeople]}
            ></UpDownNumberInput>
          </div>
          <div>Lines</div>
          <div>
            <UpDownNumberInput
              valueState={[lines, setLines]}
              backgroundColor={"gray"}
            ></UpDownNumberInput>
          </div>
          <div>Turns</div>
          <div>
            <UpDownNumberInput
              valueState={[turns, setTurns]}
            ></UpDownNumberInput>
          </div>
        </RoomSettingInput>
      </div>

      <SmallButton
        handlePopupButtonClick={handlePopupButtonClick}
        buttonText="KeyWords"
      />
      <div className={styles.buttonLayout}>
        <LargeButton buttonText="Invite" />
      </div>
      <Popup
        open={openPopup}
        onClickClose={handlePopupClose}
        backgroundColor="transparent"
      >
        {
          <div>
            {mingleKeywordList.map((keyword) => (
              <div className={styles.keywords_layout}>
                <div>{keyword}</div>
              </div>
            ))}
            <SmallButton buttonText="Choose" />
          </div>
        }
      </Popup>
    </>
  );
}
