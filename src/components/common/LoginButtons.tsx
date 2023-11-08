"use client"
import React from 'react';
import Link from "next/link";
import {useSession} from "next-auth/react";

const LoginButtons = () => {
    const {data: session, status} = useSession();

    if (status === 'loading') {
        return (
            <button disabled>...loading
            </button>
        );
    }

    if (session && session.user) {
        return (
            <Link href="/api/auth/signout">
                LOGOUT
            </Link>
        );
    }

    return (
        <Link href="/api/auth/signin">
            LOGIN
        </Link>
    );
};

export default LoginButtons;