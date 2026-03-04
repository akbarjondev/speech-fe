import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRecordingStore } from "../store/useRecordingStore";
import toast from "react-hot-toast";

const newSocket = io(import.meta.env.VITE_BASE_URL);

export const useSocket = () => {
  const [socket, setSocket] = useState<typeof newSocket | null>(newSocket);
  const [connected, setConnected] = useState(!!socket?.connected);
  const setWaitingAnswer = useRecordingStore((state) => state.setWaitingAnswer);

  useEffect(() => {
    socket?.connect();

    socket?.on("connect", () => {
      setConnected(true);
    });

    socket?.on("connect_error", (error) => {
      console.error("Socket error:", error);
      toast.error("Socket error :(");

      setConnected(false);
    });

    socket?.on("disconnect", () => {
      setConnected(false);
    });

    // For handled server error
    socket?.on("server-error", (errorData) => {
      console.log(errorData);
      toast.error("Server error :(");
      setWaitingAnswer(false);
    });

    return () => {
      if (socket?.connected) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket, setWaitingAnswer]);

  return { socket, connected };
};
