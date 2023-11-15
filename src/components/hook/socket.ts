import { useContext } from "react";
import { SocketContext, SocketProvider } from "../context/socket";

const useChatSocket = () => {
  const { chatSocket } = useContext(SocketContext);
  return {
    chatSocket,
  };
};

export default useChatSocket;
