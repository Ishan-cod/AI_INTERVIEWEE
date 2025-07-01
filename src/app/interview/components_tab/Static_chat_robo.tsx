import React from "react";
import Lottie from "lottie-react";
import animation_data from "@/Animations/ROBO_ANIMATION.json";
import anime_data from "@/Animations/ROBO_ANim.json";
import { Card } from "@/components/ui/card";

export default function Static_ChatBot() {
  return (
    <>
      <div className="items-center justify-center flex-col">
        <div className="flex">
          <div className="text-green-300 border-[1.5px] border-green-300 rounded-lg text-xs p-1">
            YOUR TURN
          </div>
        </div>

        <div className=" p-2 flex items-center justify-center">
          <Lottie animationData={anime_data} loop={true} className="size-25"/>
        </div>
      </div>
    </>
  );
}
