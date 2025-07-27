import React from "react";

type prop = {
  conclusionStatement: string;
};
export function ConclusionArea(prop: prop) {
  return (
    <>
      <div className="bottom bg-black w-full p-2 rounded-lg my-1.5">
        <div className="text-red-400 font-semibold font-sans">CONCLUSION :</div>
        <div>{prop.conclusionStatement}</div>
      </div>
    </>
  );
}
