import React from "react";

interface AI_Message {
  message: string;
}

export default function AI_Message(msg: AI_Message) {
  return (
    <div className="flex w-full">
      <div className="max-w-75 mt-1">
        <div className="bg-[#1E1E1E] text-[#E0E0E0] self-start p-2 text-[13px] rounded-lg ml-1 mt-1">
          {msg.message}
        </div>
      </div>
    </div>
  );
}
