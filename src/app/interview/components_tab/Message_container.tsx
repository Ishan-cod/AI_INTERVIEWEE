import React from "react";

export function Message_Container({ children }: any) {
  return (
    <div className="flex-2/3 pt-10 p-1.5 min-h-0">
      <div className="bg-[#1C1C1F] h-full w-full rounded-lg p-2 overflow-hidden">
        <div className="h-full w-full bg-[#0c0c0deb] rounded-lg p-2 overflow-hidden">
          <div className="message h-full flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
