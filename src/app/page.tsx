"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {useEffect, useState} from "react";
import Popup from "@/components/popup/popup";
import {motion} from "framer-motion";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [openPopup, setOpenPopup] = useState<boolean>(false);

    const handlePopupButtonClick = () => {
        setOpenPopup(true);
    };
    const handlePopupClose = () => {
        setOpenPopup(false);
    };


    const handleClickLogin = (e) => {
        // setAnimationStart(true);
        e.preventDefault(); // Prevent default link behavior

        // await new Promise(resolve => setTimeout(resolve, 500)); // Match your exit animation duration
        // setTimeout(() => {
        //     router.push('/login');
        // }, 500);

        // Change the route using Next.js's router.push()
    }

    return (
        <motion.div
            key={'/'}
            initial={{top: -1000, opacity: 0}}
            animate={{top: 0, opacity: 1}}
            exit={{top: -1000, opacity: 0}}
            transition={{duration: 0.5}}
            className={styles.main}>
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
            <Link href={'/login'} className={styles.double_down_arrow}>
                <Image
                    src="/double_down_arrow.svg"
                    alt="double down arrow"
                    width={36}
                    height={30}
                    priority
                />
            </Link>
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
        </motion.div>
    );
}
