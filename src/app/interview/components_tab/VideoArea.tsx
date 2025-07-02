import React from "react";
import VideoFeed from "./VideoFeedLoad";
import StaticChatBot from "./StaticChatAnimation";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import ThinkingRobo from "./ThinkingRoboAnimation";
import {
  useAIResponseStore,
  useVideoStore,
} from "@/app/store/useStore_Zustand";
import CallBar from "@/app/check_device/components_check/Camera_bar";

export default function VideoBox() {
  // Global state for video state (handled via video bar)
  const AiResponding = useAIResponseStore((state) => state.isAiResponding);
  const video = useVideoStore((state) => state.isVideo);

  return (
    <div className="flex-1/3">
      <div className="h-full w-full items-center justify-center flex p-1.5 ">
        <div className="h-full w-full rounded-lg bg-[#1C1C1F]">
          <div className="flex-[1] h-5/6">
            <div className="flex h-full">
              <div className="bg-black flex-1/2 m-1 mr-0 w-full rounded-[26px] p-2">

                {/* AI CALL BOX */}

                <NeonGradientCard borderSize={3}>
                  <div className=" rounded-[26px] bg-[#1C1C1F]">
                    <div className="">
                      {AiResponding ? <ThinkingRobo /> : <StaticChatBot />}
                    </div>
                  </div>
                </NeonGradientCard>

                {/* AI CALL BOX */}

              </div>
              <div className="bg-black flex-1/2 m-1 w-full rounded-[26px]">

                {/* Human call box */}

                {video ? (
                  <VideoFeed need_video={true} />
                ) : (
                  <VideoFeed need_video={false} />
                )}

                {/* Human call box */}

              </div>
            </div>
          </div>

          <div className="flex w-full justify-center items-center">
            {/* Call Element here */}
            <CallBar />
          </div>
        </div>
      </div>
    </div>
  );
}
