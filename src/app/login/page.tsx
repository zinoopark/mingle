"use client";
import CommonHeader from "@/components/common/CommonHeader/CommonHeader";
import LoginInput from "@/components/login/LoginInput";
import {motion} from "framer-motion";

export default function Login() {
    return (
        <motion.div
            key={'/login'}
            initial={{translateY: 1000, opacity: 0}}
            animate={{translateY: 0, opacity: 1}}
            exit={{translateY: 1000, opacity: 0}}
            transition={{duration: 0.5}}
        >
            <CommonHeader headerText={`MINGLE\n TOGETHER NOW!`}></CommonHeader>
            <LoginInput></LoginInput>
        </motion.div>
    );
}
