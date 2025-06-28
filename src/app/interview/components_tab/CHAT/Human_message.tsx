import React from "react";

interface Human_message_obj {
  message: string;
}

export default function Human_message(msg: Human_message_obj) {
  return (
    <div className="w-full flex justify-end">
      <div className="max-w-60 mt-1">
        <div className="bg-[#056162] text-[#FFFFFF] self-end p-2 text-sm rounded-lg mt-1 mr-1">
          {msg.message}
        </div>
      </div>
    </div>
  );
}
