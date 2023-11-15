"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SocketIOClient from "socket.io-client";
import { useRouter } from "next/navigation";

const API_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

export default function Chatting() {
  const [socket, setSocket] = useState<any>(null);
  const router = useRouter();

  useEffect((): any => {
    if (!API_SERVER_URL) throw new Error("API_SERVER_URL is not defined");

    const socket = SocketIOClient(API_SERVER_URL) as any;
    setSocket(socket);
    console.log(socket.id);

    socket.on("connect", () => {
      socket.on("useSuccess", () => {
        console.log({
          title: "succeed!",
          status: "success",
          duration: 3000,
        });
      });
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const handleClickMingle = () => {
    if (!socket) throw new Error("socket is not defined");
    const roomId = uuidv4();
    socket.emit("join_room", { roomId });
    router.push(`/chat/${roomId}`);
  };

  return (
    <div>
      <button onClick={handleClickMingle}>Mingle !</button>
    </div>
  );
}
