"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { Manager, Socket } from "socket.io-client";
import SocketIOClient from "socket.io-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

interface SocketContextValue {
  chatSocket: Socket | null;
}

export const SocketContext = createContext<SocketContextValue>({
  chatSocket: null,
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // const manager = new Manager(`${SERVER_ADDRESS}`, {
    //   //소캣 연결시 토큰 전달
    //   //   extraHeaders: {
    //   //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   //   },
    // });

    // const newChatSocket = manager.socket("/chat-room", {});
    if (!SERVER_URL) throw new Error("SERVER_URL is not defined");

    const newChatSocket = SocketIOClient(SERVER_URL);
    setChatSocket(newChatSocket);

    return () => {
      newChatSocket.disconnect();
    };
  }, []);

  const contextValue = {
    chatSocket,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
