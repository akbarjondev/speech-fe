import { useEffect, useState } from "react";
import { useSocket } from "../hook/useSocket";
import { startRecord, stopRecord } from "../utils/recording";
import { useRecordingStore } from "../store/useRecordingStore";

export const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { socket } = useSocket();
  const setMessages = useRecordingStore((state) => state.setMessages);
  const isWaitingAnswer = useRecordingStore((state) => state.isWaitingAnswer);
  const setWaitingAnswer = useRecordingStore((state) => state.setWaitingAnswer);

  useEffect(() => {
    socket?.on("server-message", (data) => {
      setMessages({
        owner: "server",
        text: data,
      });

      setWaitingAnswer(false);
    });
  }, [socket, setMessages, setWaitingAnswer]);

  const handleButtonCLick = async () => {
    if (socket?.connected) {
      if (!isRecording) {
        await startRecord(async (blob) => {
          const audioUrl = URL.createObjectURL(blob);

          setMessages({
            owner: "client",
            audioUrl,
          });

          socket?.emit("message", await blob.arrayBuffer());
          setWaitingAnswer(true);
        });
      } else {
        await stopRecord();
      }

      setIsRecording(!isRecording);
    } else {
      console.log("Socket not connected yet");
    }
  };

  return (
    <button
      onClick={handleButtonCLick}
      disabled={isWaitingAnswer}
      className={`text-white font-semibold rounded-xs my-2 py-2 cursor-pointer ${isRecording ? "bg-black" : "bg-red-500"} ${isWaitingAnswer ? "opacity-50" : ""}`}
    >
      {isRecording ? "Stop" : "Record voice"}
    </button>
  );
};
