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
import React, { useEffect, useState } from "react";

type Props = {
  is_video: boolean;
  set_is_video: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Camera_bar({ is_video, set_is_video }: Props) {
  const [is_camera_on, set_is_camera_on] = useState<boolean>(false);
  const [is_mic_on, set_is_mic_on] = useState<boolean>(false);
  useEffect(() => {
    set_is_video(is_camera_on);
  }, [is_camera_on]);

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
