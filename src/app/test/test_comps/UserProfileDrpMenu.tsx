import { Card } from "@/components/ui/card";

import { User } from "lucide-react";
import React from "react";
import UserProfileDrpMenuContent from "./UserProfileDrpMenuContent";

export default function UserProfileDrpMenu() {
  return (
    // Profile name section
    <Card className="p-0.5 bg-[linear-gradient(145deg,_#1e1e1e,_#2a2a2a)] border-0">
      <div>
        <Card className="bg-[#212121] rounded-lg h-12 justify-center w-[250px] border-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center">
              <div className=" bg-white flex ml-1 mr-2 rounded-lg w-[35px] h-[35px] items-center justify-center">
                <User />
              </div>
              <div className="">
                <div className="justify-items-start items-center">
                  <div className="font-semibold mb-0 text-[#f9fafb]">
                    Ishan Jaiswal
                  </div>
                  <div className="text-xs mt-0 text-[#9ca3af]">User</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile name section */}

        {/* Drop down menu content */}
        <UserProfileDrpMenuContent />
        {/* Drop down menu content */}
      </div>
    </Card>
  );
}
