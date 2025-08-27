"use client";
import { TypewriterEffect } from "../ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Very",
      className: "text-white",
    },
    {
      text: "own",
      className: "text-white",
    },
    {
      text: "AI",
      className: "text-white",
    },
    {
      text: "Interviewee",
      className: "text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10"></div>
    </div>
  );
}
