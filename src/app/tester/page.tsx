"use client";

import React, { useState } from "react";
import { useSpeechToText } from "../interview/components_tab/CHAT/SpeechToTextHook";
import { Button } from "@/components/ui/button";
import { Mic2, MicOff } from "lucide-react";

export default function Page() {
  const { isListening, start, stop, transcript } = useSpeechToText('eng-IN',10000);
  
  const handleStart = async () => {
    try {
      await start();
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
    }
  };
  
  const handleStop = () => {
    stop();
  };

  return (
    <div className="p-4 space-y-4">
      {/* Display transcript */}
      <div className="min-h-[100px] p-4 border rounded-lg bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">Transcript:</p>
        <p className="text-gray-800">{transcript || "No speech detected yet..."}</p>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2">
        {isListening ? (
          <>
            <Mic2 className="text-red-500 animate-pulse" />
            <span className="text-red-500 font-medium">Listening...</span>
          </>
        ) : (
          <>
            <MicOff className="text-gray-500" />
            <span className="text-gray-500">Not listening</span>
          </>
        )}
      </div>

      {/* Control buttons */}
      <div className="flex gap-2">
        <Button 
          onClick={handleStart} 
          disabled={isListening}
          className="flex items-center gap-2"
        >
          <Mic2 size={16} />
          START
        </Button>
        <Button 
          onClick={handleStop} 
          variant="destructive"
          disabled={!isListening}
          className="flex items-center gap-2"
        >
          <MicOff size={16} />
          STOP
        </Button>
      </div>
    </div>
  );
}