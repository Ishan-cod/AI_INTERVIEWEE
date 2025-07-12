import React from "react";


export default function Main_body({children} : any) {
  return (
    <div className="bg-[#09090B] w-full h-full">
      <div className="flex justify-center items-center h-full w-full">
        <div className="bg-[#1C1C1F] rounded-[26px] w-full h-full m-1.5 flex flex-col overflow-hidden">
          {/* here */}
          {children}
        </div>
      </div>
    </div>
  );
}
