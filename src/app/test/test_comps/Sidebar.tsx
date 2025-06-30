import { Button } from "@/components/ui/button";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { Inter, Roboto } from "next/font/google";
import Recent_act from "./Recent_act";

import User_profile_drpdwn from "./User_profile_drpdwn";

// My Dashboard
// Jobs available
// Interview secion
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function Sidebar() {
  return (
    <div className="bg-[#09090B] w-[300px] h-full justify-center items-start text-amber-50">
      <div className="bg-amber-300 w-full text-black">APP NAME</div>
      <div>
        <div className="m-0.5 pt-1 pb-1">
          <User_profile_drpdwn />
        </div>
      </div>
      <div
        className="h-full overflow-auto"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        <div className="w-full  h-full">
          <div className="mb-7 mt-2 mr-0.5 ml-0.5">
            <Button
              className={`bg-[#09090B] w-full m-0.5 mt-1.5 justify-start text-[14px] font-light hover:bg-[#212121] ${roboto.className} cursor-pointer`}
            >
              My Dashboard
            </Button>
            <Button
              className={`bg-[#09090B] w-full m-0.5 mt-1.5 justify-start text-[14px] font-light hover:bg-[#212121] ${roboto.className} cursor-pointer`}
            >
              Jobs Available
            </Button>
            <Button
              className={`bg-[#09090B] w-full m-0.5 mt-1.5 justify-start text-[14px] font-light hover:bg-[#212121] ${roboto.className} cursor-pointer`}
            >
              Interviews
            </Button>
            <Button
              className={`bg-[#09090B] w-full m-0.5 mt-1.5 justify-start text-[14px] font-light hover:bg-[#212121] ${roboto.className} cursor-pointer`}
            >
              Recruit
            </Button>
          </div>
          <div>
            <div className="m-2">
              <Separator className="bg-white/25 " />
            </div>
            <div className="">
              <div className="m-2 text-sm text-white/50">Recent</div>
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
              <Recent_act />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
