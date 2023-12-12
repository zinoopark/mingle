"use client";

import useChatSocket from "@/components/hook/socket";
import { useEffect, useRef, useState } from "react";

export default function Page({ params }: { params: { roomId: string } }) {
  const [chat, setChat] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [sendMessage, setSendMessage] = useState<string>("");

  const [muted, setMuted] = useState<boolean>(false);
  const [stream, setStream] = useState<any | undefined>(undefined);
  const [peerConnection, setPeerConnection] = useState<
    RTCPeerConnection | undefined
  >(undefined);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { chatSocket: socket } = useChatSocket();

  const roomId = params.roomId;

  async function getMedia() {
    if (!navigator.mediaDevices)
      return alert("미디어를 지원하지 않는 브라우저입니다.");
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      console.log(media);
      setStream(media);
    } catch (err) {
      console.log(err);
    }
  }

  const mediaConnection = () => {
    const newPeerConnection = new RTCPeerConnection();
    setPeerConnection(newPeerConnection);

    stream?.getTracks().forEach((track: any) => {
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
    if (peerConnection && socket) {
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

      // peerConnection.onicecandidate = (event) => {
      //   if(event.candidate){
      //     socket?.emit("ice", roomId, event.candidate);
      //   }
      // }
    }
  }, [peerConnection, socket]);

  // useEffect(() => {
  //   console.log(navigator);

  //   getMedia();
  // }, [navigator]);

  useEffect(() => {
    // Moved to inside of useEffect because this function is depended on `stream`
    async function setupAudio() {
      if (!stream) {
        await setupStream();
      } else {
        const audioCurr = audioRef.current;
        if (!audioCurr) return;
        const audio = audioCurr;
        if (!audio.srcObject) {
          audio.srcObject = stream;
        }
      }
    }
    setupAudio();
  }, [stream]);

  async function setupStream() {
    try {
      const ms = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(ms);
    } catch (e) {
      alert("Audio strean is disabled");
      throw e;
    }
  }

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
        <audio ref={audioRef} autoPlay muted={muted} />
        <div>
          <button onClick={handleClickMuteButton}>
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>
    </div>
  );
}
