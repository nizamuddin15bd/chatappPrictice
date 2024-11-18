import React from "react";

const Chat = ({ chat, user }) => {
  return (
    <div className=" pb-12 h-full md:p-4">
      <div className="w-full h-full max-h-screen rounded-md overflow-y-auto gradient">
        {/* {chat.map((message, i) => {
          message = { ...message, own: message.user === user };
          return <Message key={i} {...message} />; 
        })} */}
        {chat.map((message, index) => {
          message = { ...message, own: message.user?.id === user.id };
          return <Message key={index} {...message} />;
        })}
        {/* <Message content="hello" own={true} /> */}
      </div>
    </div>
  );
};
const Message = ({ content, own }) => {
  return (
    <p className={`px-6 py-1 flex ${own && "justify-end"}`}>
      <span
        className={`text-3xl px-6 py-2 rounded-2xl ${
          own ? "bg-sky-400" : "bg-sky-300 text-white"
        }`}
      >
        {content}
      </span>
    </p>
  );
};

export default Chat;
