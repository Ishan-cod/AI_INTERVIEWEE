import { Button } from "@/components/ui/button";
import {
  LucidePhoneCall,
  Menu,
  MessagesSquareIcon,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";
import React, { useState } from "react";

export default function Camera_bar() {
  const [is_camera_on, set_is_camera_on] = useState(false);
  const [is_mic_on, set_is_mic_on] = useState(false);

  return (
    <>
      <div className="bg-[#121111] flex items-center justify-evenly w-2xs rounded-md h-9.5">
        <Button className="hover:bg-[#212121]">
          <Menu></Menu>
        </Button>
        <Button
          className="hover:bg-[#212121]"
          onClick={() => set_is_camera_on(!is_camera_on)}
        >
          {is_camera_on ? <Video /> : <VideoOff />}
        </Button>
        <Button className="bg-red-700 hover:bg-red-800">
          <LucidePhoneCall />
        </Button>
        <Button
          className="hover:bg-[#212121]"
          onClick={() => set_is_mic_on(!is_mic_on)}
        >
          {is_mic_on ? <Mic /> : <MicOff />}
        </Button>
        <Button className="hover:bg-[#212121]">
          <MessagesSquareIcon />
        </Button>
      </div>
    </>
  );
}
