import { useSkillStore } from "@/app/store/useStore_Zustand";
import React, { useState } from "react";

export default function SkillTag({ skill }: { skill: string }) {
  const [isClicked, setisClicked] = useState<boolean>(false);
  const { setSkills, unsetSkills } = useSkillStore();

  const handleClickSelect = () => {
    setisClicked(true);
    setSkills(skill);
  };

  const handleClickUnselect = () => {
    setisClicked(false);
    unsetSkills(skill);
  };

  return (
    <>
      {isClicked ? (
        <div
          className="flex justify-center items-center w-[120px] bg-white p-2 rounded-md mt-2 mr-2 hover:cursor-pointer text-xs"
          onClick={handleClickUnselect}
        >
          <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-black text-xs flex">
            <div>{skill}</div>
          </span>
        </div>
      ) : (
        <div
          className="flex justify-center items-center w-[120px] bg-[#aba9a9] p-2 rounded-md mt-2 mr-2 hover:bg-white hover:cursor-pointer text-xs"
          onClick={handleClickSelect}
        >
          <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-black text-xs">
            {skill}
          </span>
        </div>
      )}
    </>
  );
}
