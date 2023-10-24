"use client"
import {useEffect} from "react";

const createWebSocket = () => {
    const socket = new WebSocket('ws://localhost:3000/api/websocket');

    // Initialize message handling functions
    const messageHandlers = [];

    socket.addEventListener('open', (event) => {
        // Handle WebSocket connection established
        console.log('WebSocket connection established');
        // Now that the connection is open, you can send any queued messages
        messageHandlers.forEach((handler) => handler());
    });

    socket.addEventListener('message', (event) => {
        // Handle incoming WebSocket messages
        console.log('Received message:', event.data);
    });

    socket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed');
    });

    // Function to send a message
    const sendMessage = (message) => {
        // Check if the WebSocket is open before sending a message
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        } else {
            console.error('WebSocket is not open. Message not sent.');
            // If the socket is not open, queue the message for later
            messageHandlers.push(() => {
                socket.send(message);
            });
        }
    };

    // Function to close the WebSocket connection
    const closeWebSocket = () => {
        socket.close();
    };

    return {
        sendMessage,
        closeWebSocket,
    };
};

export default createWebSocket;
