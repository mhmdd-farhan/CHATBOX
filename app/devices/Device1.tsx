"use client";

import { Message, useWsClient } from "@/hooks/use-ws-client";
import { Send } from "lucide-react";
import { type RefObject, useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface Dialog {
  channel: string;
  chats: Message[];
}

export const Device1 = () => {
  const SOCKET_IO_URL = "http://localhost:3001";
  const SENDER_DEVICE_NUMBER = "device1";
  const RECEIVER_DEVICE_NUMBER = "device2";
  const CHANNEL = "live-chat";

  const [chats, setChats] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const onOnline = useCallback((message: string) => {
    console.log("on online event triggered", message);
  }, []);

  const onOffline = useCallback((message: string) => {
    console.log("on offline event triggered", message);
  }, []);

  const onJoin = useCallback(
    (socket: RefObject<Socket | null>) => {
      if (!socket.current) return;
      socket.current.emit("join", {
        channelName: CHANNEL,
        clientName: SENDER_DEVICE_NUMBER,
      });
    },
    [CHANNEL, SENDER_DEVICE_NUMBER]
  );

  const onMessage = useCallback(
    (message: Message) => {
      setChats((prev) => {
        const next = [...prev, message];

        const chatsJson = localStorage.getItem("chats");
        const parsed: Dialog[] = chatsJson ? JSON.parse(chatsJson) : [];

        const exists = parsed.some((d) => d.channel === CHANNEL);

        const updated = exists
          ? parsed.map((d) =>
              d.channel === CHANNEL ? { ...d, chats: next } : d
            )
          : [...parsed, { channel: CHANNEL, chats: next }];

        localStorage.setItem("chats", JSON.stringify(updated));

        return next;
      });
    },
    [CHANNEL]
  );

  const { socket } = useWsClient({
    url: SOCKET_IO_URL,
    onJoin,
    onMessage,
    onOffline,
    onOnline,
  });

  useEffect(() => {
    function getChats() {
      const chatsJson = localStorage.getItem("chats");
      if (!chatsJson) return [];

      const parsedChats: Dialog[] = JSON.parse(chatsJson);
      const channelChats = parsedChats.find(
        (channel) => channel.channel === CHANNEL
      );

      return channelChats?.chats ?? [];
    }

    const chats = getChats();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChats(chats);
  }, []);

  const handleSendMessage = () => {
    console.log("Sending message....");
    const chatsJson = localStorage.getItem("chats");
    if (!chatsJson) {
      localStorage.setItem(
        "chats",
        JSON.stringify([
          {
            channel: CHANNEL,
            chats: [],
          },
        ])
      );
    }
    const messageToSend = {
      sender: SENDER_DEVICE_NUMBER,
      receiver: RECEIVER_DEVICE_NUMBER,
      text: message,
      created_at: new Date().toLocaleTimeString(),
    };
    socket.current?.emit("send_message", {
      channelName: CHANNEL,
      message: messageToSend,
    });
    console.log("Send mesage success");
    setMessage("");
  };

  return (
    <div
      id="frame"
      className="w-[400px] h-[700px] p-3 border-8 border-gray-400 rounded-2xl bg-amber-50 flex flex-col justify-between"
    >
      <div
        id="chats"
        className="relative space-y-2 max-h-full overflow-y-scroll noscrollbar"
      >
        {chats.length > 0 ? (
          chats.map((chat, i) => (
            <div
              key={i + 1}
              className={`w-full ${
                chat.sender === SENDER_DEVICE_NUMBER ? "swrapper" : "rwrapper"
              }`}
            >
              <div
                className={`rounded-md w-fit max-w-[75%] ${
                  chat.sender === SENDER_DEVICE_NUMBER ? "sender" : "receiver"
                }`}
              >
                {/* <small>
                  {chat.sender === SENDER_DEVICE_NUMBER ? "You" : chat.sender}
                </small> */}
                <p>{chat.text}</p>
                <small className="block text-gray-300 text-right">
                  {chat.created_at}
                </small>
              </div>
            </div>
          ))
        ) : (
          <h1 className="w-full text-black text-center">No Chat</h1>
        )}
      </div>
      <div
        id="input"
        className="w-full p-4 bottom-0 input flex justify-between gap-2 rounded-4xl"
      >
        <input
          value={message}
          className="border-none focus:outline-none"
          type="text"
          placeholder="Type message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-background p-2 rounded-2xl"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};
