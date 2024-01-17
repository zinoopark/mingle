"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Popup from "@/components/popup/popup";

export default function Home() {
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const handlePopupButtonClick = () => {
    setOpenPopup(true);
  };
  const handlePopupClose = () => {
    setOpenPopup(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.main_logo}>
        <a href="/" target="_self" rel="noopener noreferrer">
          <Image
            src="/mingle_logo.svg"
            alt="Mingle Logo"
            width={251}
            height={73}
            priority
          />
        </a>
        <button className={styles.button} onClick={handlePopupButtonClick}>
          <Image
            src="/question_mark.svg"
            alt="question mark"
            width={18}
            height={18}
            priority
          />
        </button>
      </div>
      <div className={styles.description}>
        <p>
          GET 6 CHANCES<br></br> TO GUESS A <br></br>5-LETTER WORD.
        </p>
      </div>
      <div className={styles.double_down_arrow}>
        <Image
          src="/double_down_arrow.svg"
          alt="double down arrow"
          width={36}
          height={30}
          priority
        />
      </div>
      <Popup open={openPopup} onClickClose={handlePopupClose}>
        {
          <div className={styles.popup_content}>
            <h3>HOW TO MINGLE?</h3>

            <p>
              MINGLE IT! <br></br>MINGLE IT! GET 6 CHANCES TO GUESS A 5-LETTER.
              GET 6 CHANCES TO GUESS A 5-LETTER.
            </p>
            <button className={styles.button} onClick={handlePopupClose}>
              <Image
                src="/x-button.svg"
                alt="close button"
                width={36}
                height={30}
                priority
              />
            </button>
          </div>
        }
      </Popup>
    </div>
  );
}
