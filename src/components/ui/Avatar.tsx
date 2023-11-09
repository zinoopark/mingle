import React, {useEffect} from 'react';
import Image from "next/image";
import styles from './Avatar.module.css'
import {stringToColorCode} from "@/utils/stringToColorCode";

interface AvatarProps {
    size: 'small' | 'medium' | 'large';
    type: 'photo' | 'color' | 'text';
    pictureUrl?: string;
    userName: string;
    isActive?: boolean;
}

const Avatar = ({size, type, isActive = false, pictureUrl, userName}: AvatarProps) => {


    // this component is to show an avatar of a user. It has 3 types of mode, which are photo, color, and text.
    // photo: show the user's profile picture from Oauth provider
    // color: show a circle with a color. the color is decided by the user's id.
    // text: show the user's name's first letter. the color is decided by the user's name.

    // size: small, medium, large
    // pointColor: the color of the circle
    // pictureUrl: the url of the user's profile picture
    // userName: the user's name

    // if the user's profile picture is not provided, the component will show the user's name's first letter.
    // if the user's name is not provided, the component will show the user's id's first letter.

    let outerCircleColor;
    if (isActive) {
        outerCircleColor = 'yellowgreen'
    } else {
        outerCircleColor = 'transparent'
    }


    const contentColor = stringToColorCode(userName)
    console.log(contentColor)

    let circleSize;
    switch (size) {
        case 'small':
            circleSize = 30;
            break;
        case 'medium':
            circleSize = 50;
            break;
        case 'large':
            circleSize = 80;
            break;
        default:
            circleSize = 30;
            break;
    }
    let content;
    switch (type) {
        case 'photo':
            if (pictureUrl) {
                content =
                    <Image src={pictureUrl} width={circleSize} height={circleSize} alt="profile picture"
                           className={styles.pictureTypeContent}/>;
            } else {
                content = <div
                    className={styles.textTypeContent}>
                    {userName ? userName[0] : 'U'}
                </div>;
            }
            break;
        case 'color':
            content = <div
                style={{background: contentColor}}
                className={`${styles.colorTypeContent}`}>
            </div>;
            break;
        case 'text':
            content = <div
                style={{background: contentColor}}
                className={styles.textTypeContent}>
                {userName ? userName[0] : 'U'}
            </div>;
            break;
        default:
            content = <div
                className={styles.textTypeContent}>
                {userName ? userName[0] : 'U'}
            </div>;
            break;
    }


    return (
        <div style={{background: outerCircleColor, width: circleSize, height: circleSize}}
             className={`${styles.outerCircle} ${styles[circleSize]}`}>
            <div className={styles.innerCircle}>
                {content}
            </div>
        </div>
    );
};

export default Avatar;