"use client";
import Chat from "@/components/Chat";
import Input from "@/components/Input";
import SignUp from "@/components/SignUp";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003");

export default function Home() {
  const [chat, setChat] = useState([]);

  const user = useRef("bobby");

  useEffect(() => {
    socket.on("recieved_message", (msg) => {
      setChat((prev) => [...prev, msg]); // Add messages from the server
    });

    return () => {
      socket.off("recieved_message");
    };
  }, []);

  return (
    <main className="h-screen max-h-screen max-w-screen mx-auto md:container md:p-20 md:pt-4">
      {/* <button onClick={() => socket.emit("btn_clicked")}>click here</button> */}
      {user.current ? (
        <>
          <Chat chat={chat} user={user} />{" "}
          <Input setChat={setChat} user={user.current} socket={socket} />
        </>
      ) : (
        <SignUp />
      )}
    </main>
  );
}
