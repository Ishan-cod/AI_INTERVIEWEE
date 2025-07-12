import { Card } from "@/components/ui/card";
import { ChevronDown, User } from "lucide-react";
import React from "react";

export default function ProfileCard() {
  return (
    <Card className="bg-[#212121] rounded-lg h-12 justify-center border-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <div className=" bg-white flex ml-1 mr-2 rounded-lg w-[35px] h-[35px] items-center justify-center">
            <User />
          </div>
          <div className="">
            <div className="justify-items-start items-center">
              <div className="font-semibold mb-0 text-white">Ishan Jaiswal</div>
              <div className="text-xs mt-0 text-white/70">User</div>
            </div>
          </div>
        </div>
        <div>
          <ChevronDown className="text-white" />
        </div>
      </div>
    </Card>
  );
}
