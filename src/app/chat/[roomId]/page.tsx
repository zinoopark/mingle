"use client";

import useChatSocket from "@/components/hook/socket";
import { useEffect, useState } from "react";

async function getMedia() {
  try {
    const media = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    console.log(media);
    return media;
  } catch (err) {
    console.log(err);
  }
}

export default function Page({ params }: { params: { roomId: string } }) {
  const [chat, setChat] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [sendMessage, setSendMessage] = useState<string>("");

  const [muted, setMuted] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | undefined>(undefined);
  const [peerConnection, setPeerConnection] = useState<
    RTCPeerConnection | undefined
  >(undefined);

  const { chatSocket: socket } = useChatSocket();

  const roomId = params.roomId;

  useEffect((): any => {
    if (socket) {
      socket.emit("join_room", roomId, renewCount);

      socket.on("message", addMessage);

      socket.on("someone_joined", renewCount);

      socket.on("someone_left", renewCount);

      socket.on("welcome", async () => {
        const offer = await peerConnection?.createOffer();
        peerConnection?.setLocalDescription(offer);
        console.log(offer);
        socket.emit("offer", roomId, offer);
      });

      socket.on("offer", async (offer) => {
        peerConnection?.setRemoteDescription(offer);
        const answer = await peerConnection?.createAnswer();
        peerConnection?.setLocalDescription(answer);
        socket.emit("answer", roomId, answer);
      });

      socket.on("answer", (answer) => {
        peerConnection?.setRemoteDescription(answer);
      });

      console.log(socket);
    }
    if (socket) return () => socket.emit("leave_room", roomId);
  }, [socket]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getMedia().then((media) => {
        setStream(media);
      });
    }
  }, []);

  const mediaConnection = () => {
    const newPeerConnection = new RTCPeerConnection();
    setPeerConnection(newPeerConnection);

    stream?.getTracks().forEach((track) => {
      newPeerConnection.addTrack(track, stream);
    });
  };

  const addMessage = (message: string) => {
    setChat((prev) => [...prev, message]);
  };

  const renewCount = (newCount: number) => {
    setCount(newCount);
  };

  const handleSendMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSendMessage(event.target.value);
  };

  const handleClickSendButton = async (
    event?: React.FormEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();
    if (sendMessage) {
      const message = sendMessage;

      socket?.emit("message", roomId, message, addMessage);
      setSendMessage("");
    }
  };

  const enterKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // send message
      event.preventDefault();
      handleClickSendButton();
    }
  };

  const handleClickMuteButton = () => {
    if (muted) {
      setMuted(false);
    } else {
      setMuted(true);
    }
  };

  return (
    <div>
      <h1>Room Name : {params.roomId}</h1>
      <h2>Count : {count}</h2>
      <div>
        {chat.map((message, index) => (
          <div key={index}>
            <p>{message}</p>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={sendMessage || ""}
          onChange={handleSendMessageChange}
          onKeyUp={enterKeyUp}
        />
        <button onClick={handleClickSendButton}>Send</button>
      </div>

      <div>
        <audio autoPlay muted={muted} src={`${stream ? stream : ""}`} />
        <div>
          <button onClick={handleClickMuteButton}>
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>
    </div>
  );
}
