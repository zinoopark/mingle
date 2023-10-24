"use client"
import React, {useEffect} from 'react';
import io from "socket.io-client";

let socket;
const Chat = () => {
    const [message, setMessage] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [allMessages, setAllMessages] = React.useState([]);

    useEffect(() => {
        socketInitializer();

        // return () => {
        //     socket.disconnect();
        // };
    }, []);

    async function socketInitializer() {
        await fetch("/api/socket");

        socket = io();

        socket.on("receive-message", (message) => {
            setAllMessages((prev) => [...prev, data])
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log('emitted')

        socket.emit("send-message", {
            message,
            userName,
        });

        setMessage("");
    }

    return (
        <div>
            <input value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name={'message'} placeholder={'message here'} value={message} type="text"
                           onChange={(e) => setMessage(e.target.value)} autoComplete={'off'}/>
                    <button type='submit'>send</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;