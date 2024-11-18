import React, { useRef, useState } from "react";
import { send, upload } from "@/assets/assets";
import Image from "next/image";

const Input = ({ user, socket, setChat }) => {
  const [input, setInput] = useState("");
  const uploadInput = useRef(null);

  // const sendMessage = (e) => {
  //   const msg = { content: input, type: "text", user };
  //   setChat((prev) => [...prev, msg]);
  //   socket.emit("send_message", msg);
  //   setInput("");
  // };
  const sendMessage = (e) => {
    if (input) {
      const msg = { content: input, type: "text", user };
      setChat((prev) => [...prev, msg]); // Add message directly for the sender

      socket.emit("send_message", msg); // Emit to the server
      setInput("");
    } else {
      uploadInput.current.click();
    }
  };

  const userTypeing = (e) => {
    setInput(e.target.value);
  };

  const handleImageUpload = (e) => {
    console.log(e);
    const file = e.target.value;
    console.log(file);
  };

  return (
    <div className="w-full absolute bottom-0 text-xl grid grid-cols-5 gradient md:bg-none md:text-3xl md:flex md:justify-center md:relative">
      <input
        type="text"
        placeholder="Enter your message"
        className="focus:outline-none rounded-md p-3 text-white placeholder-slate-200 col-span-4 gradient md:w-6/12 md:mr-3 "
        value={input}
        onChange={(e) => userTypeing(e)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      {/* file uploader */}
      <input
        type="file"
        ref={uploadInput}
        className="hidden"
        onChange={(e) => handleImageUpload(e)}
      />
      <button
        onClick={sendMessage}
        className="w-full py-2 px-3 bg-sky-400 text-white font-fold rounded-md text-xl gradient md:w-1/12 md:text-2xl "
      >
        <Image
          className="w-6 md:w-12 mx-auto"
          src={send}
          alt="send"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
};

export default Input;
