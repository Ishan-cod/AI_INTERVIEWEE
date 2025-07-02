import Image from "next/image";
import React from "react";

export default function AICallRipple({ imgSrc }: { imgSrc: string }) {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Ripple Background */}
      <span className="absolute w-full h-full rounded-full animate-ping bg-blue-500 opacity-20"></span>
      <span className="absolute w-3/4 h-3/4 rounded-full animate-ping bg-blue-400 opacity-30 delay-200"></span>

      {/* Pulsing Image */}
      <Image
        src={imgSrc}
        alt="AI Avatar"
        className="w-24 h-24 rounded-full z-10 animate-pulse border-4 border-white shadow-lg"
      />
    </div>
  );
}
