import { RefObject, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface WsClientProps {
  url: string;
  onJoin: (socket: RefObject<Socket | null>) => void;
  onOnline: (message: string) => void;
  onOffline: (message: string) => void;
  onMessage: (message: Message) => void;
}

export interface BodyPayload {
  channelName: string;
  clientName?: string;
  message?: string;
}

export interface Message {
  sender: string;
  receiver: string;
  text: string;
  created_at: string;
}

export const useWsClient = ({
  url,
  onJoin,
  onOnline,
  onOffline,
  onMessage,
}: WsClientProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(url, { transports: ["websocket"] });

    socketRef.current.on("connect", () => {
      onJoin(socketRef);
    });

    socketRef.current.on("online", onOnline);
    socketRef.current.on("offline", onOffline);
    socketRef.current.on("message", onMessage);

    socketRef.current.on("disconnect", (reason) => {
      console.log("DISCONNECTED:", reason);
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [url, onJoin, onOnline, onOffline, onMessage]);

  return { socket: socketRef };
};
