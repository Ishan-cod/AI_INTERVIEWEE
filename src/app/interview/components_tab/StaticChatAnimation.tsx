import React from "react";
import Lottie from "lottie-react";
import anime_data from "@/Animations/ROBO_ANim.json";

// LOTTIE ANIMATION OF NOT RESPONDING STATE OF VIDEO BOX
export default function StaticChatBot() {
  return (
    <>
      <div className="items-center justify-center flex-col">
        {/* Your turn tag */}
        <div className="flex">
          <div className="text-green-300 border-[1.5px] border-green-300 rounded-lg text-xs p-1">
            YOUR TURN
          </div>
        </div>
        {/* Your turn tag */}

        {/* Animation box */}
        <div className=" p-2 flex items-center justify-center">
          <Lottie animationData={anime_data} loop={true} className="size-25" />
        </div>
        {/* Animation box */}
      </div>
    </>
  );
}
