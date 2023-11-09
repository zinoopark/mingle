import styles from './page.module.css'
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]/route";
import React from "react";
import LoginButtons from "@/components/common/LoginButtons";

export default async function Home() {
    const session = await getServerSession(authOptions);
    return (
        <main className={styles.main}>
            <LoginButtons/>
            <h1 className={styles.title}>
                Welcome to Mingle!
            </h1>
            <p className={styles.description}>
                {session && session.user ? `Hello ${session.user.name}` : 'Please login to continue'}
            </p>
        </main>
    )
}