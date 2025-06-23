import Camera_bar from "@/app/check_device/components_check/Camera_bar";
import React from "react";

export default function Video_BOX() {
  return (
    <div className="flex-1/3">
      <div className="h-full w-full items-center justify-center flex p-1.5 ">
        <div className="h-full w-full rounded-lg bg-[#1C1C1F]">
          <div className="flex-[1] h-5/6">
            <div className="flex h-full">
              <div className="bg-black flex-1/2 m-1 mr-0 w-full rounded-lg"></div>
              <div className="bg-black flex-1/2 m-1 w-full rounded-lg"></div>
            </div>
          </div>

          <div className="flex w-full justify-center items-center">
            {/* Call Element here */}
            <Camera_bar />
          </div>
        </div>
      </div>
    </div>
  );
}
