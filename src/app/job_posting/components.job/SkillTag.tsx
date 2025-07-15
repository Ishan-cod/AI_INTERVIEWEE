import React from "react";

export default function SkillTag({ skill }: { skill: string }) {
  return (
    <>
      <div className="flex justify-center items-center w-[100px] bg-[#b8b4b4] p-1 rounded-md mt-2 mr-2 hover:bg-white hover:cursor-pointer text-xs">
        <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-black text-xs">
          {skill}
        </span>
      </div>
    </>
  );
}
