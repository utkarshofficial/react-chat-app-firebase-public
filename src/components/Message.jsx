import React from "react";
import { auth } from "../firebase";

const style = {
  message: `flex items-center shadow-xl m-1 py-2 px-3 rounded-tl-[18px] rounded-tr-[18px] max-w-[85%]`,
  name: `absolute mt-[-4rem] text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-[18px]`,
  received: `bg-[#e5e5ea] text-black float-left text-start rounded-br-[18px]`,
};

const Message = ({ message }) => {
  const messageClass =
    message.uid === auth.currentUser.uid
      ? `${style.sent}`
      : `${style.received}`;

  return (
    <div>
      <div
        style={{ overflowWrap: "anywhere" }}
        className={`${style.message} ${messageClass}`}
      >
        {/* showing name */}
        {/* <p className={style.name}>{message.name}</p> */}
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
