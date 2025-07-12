import React from "react";
import Lottie from "lottie-react";
import animation_data from "@/Animations/ROBO_ANIMATION.json";

// Lottie Animation for Responding state
export default function ThinkingRobo() {
  return (
    <>
      <div className="items-center justify-center flex-col">
        {/* Responding state */}

        <div className="flex">
          <div className="text-red-400 border-[1.5px] border-red-500 rounded-lg text-xs p-1">
            RESPONDING
          </div>
        </div>

        {/* Responding state */}

        {/* Animation */}

        <div className=" p-2 flex items-center justify-center">
          <Lottie
            animationData={animation_data}
            loop={true}
            className="size-25"
          />
        </div>

        {/* Animation */}
      </div>
    </>
  );
}
