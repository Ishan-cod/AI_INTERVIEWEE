import React from "react";
import AI_Message from "./CHAT/AI_message";
import Human_message from "./CHAT/Human_message";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Message_BOX() {
  return (
    <div className="flex-2/3 pt-10 p-1.5 min-h-0">
      <div className="bg-[#1C1C1F] h-full w-full rounded-lg p-2 overflow-hidden">
        <div className="h-full w-full bg-[#0c0c0deb] rounded-lg p-2 overflow-hidden">
          <div className="message h-full flex flex-col overflow-hidden">
            {/* Messages container with proper scrolling */}
            <div className="flex-1 overflow-hidden min-h-0">
              <div
                className="h-full overflow-y-auto"
                style={{
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE/Edge
                }}
              >
                <AI_Message />
                <Human_message />
                <AI_Message />
                <Human_message />
                <AI_Message />
              </div>
            </div>

            <Separator className="bg-white/15 flex-shrink-0" />

            {/* Input container - fixed height */}
            <div className="flex-shrink-0 pt-2">
              <div className="text-amber-50 flex">
                <Input
                  placeholder="Your Response here..."
                  className="border-0 bg-[#212121]"
                />
                <Button className="ml-2 hover:bg-[#212121]">
                  <Send />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
