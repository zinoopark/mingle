"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SocketIOClient from "socket.io-client";
import { useRouter } from "next/navigation";
import useChatSocket from "@/components/hook/socket";

export default function Chatting() {
  const router = useRouter();
  const { chatSocket: socket } = useChatSocket();

  useEffect((): any => {}, []);

  const handleClickMingle = () => {
    if (!socket) throw new Error("socket is not defined");
    const roomId = uuidv4();
    socket.emit("join_room", roomId);
    router.push(`/chat/${roomId}`);
  };

  return (
    <div>
      <button onClick={handleClickMingle}>Mingle !</button>
    </div>
  );
}
