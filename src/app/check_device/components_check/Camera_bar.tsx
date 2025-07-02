import { useSpeechToText } from "@/app/interview/components_tab/CHAT/SpeechToTextHook";
import { useVideoStore } from "@/app/store/useStore_Zustand";
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

export default function CallBar() {
  const video = useVideoStore((state) => state.isVideo);
  const toggle_video = useVideoStore((state) => state.toggleVideo);

  const { isListening, start, stop, transcript } = useSpeechToText(
    "en-IN",
    10000
  );

  const [t, setTrans] = useState<string>("");

  const handleMicClick = async () => {
    if (!isListening) {
      try {
        await start();
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
      }
    } else {
      stop();
    }
  };

  useEffect(() => {
    setTrans(transcript);
  }, [transcript]);

  console.log("Current transcript:", t);
  console.log("Is listening:", isListening);

  return (
    <div className="bg-[#121111] flex items-center justify-evenly w-2xs rounded-md h-9.5">
      <Button className="hover:bg-[#212121]">
        <Menu />
      </Button>

      <Button className="hover:bg-[#212121]" onClick={toggle_video}>
        {video ? <Video /> : <VideoOff />}
      </Button>

      <Button className="bg-red-700 hover:bg-red-800">
        <LucidePhoneCall />
      </Button>

      <Button
        className={`hover:bg-[#212121] ${isListening ? "bg-red-600" : ""}`}
        onClick={handleMicClick}
      >
        {isListening ? <Mic className="text-white" /> : <MicOff />}
      </Button>

      <Button className="hover:bg-[#212121]">
        <MessagesSquareIcon />
      </Button>

      {/* Optional: Display transcript for debugging */}
      {transcript && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-black text-white text-xs rounded max-w-xs">
          {t}
        </div>
      )}
    </div>
  );
}
