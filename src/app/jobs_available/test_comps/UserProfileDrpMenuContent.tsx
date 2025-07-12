import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BriefcaseBusiness,
  LayoutDashboardIcon,
  UserRoundPenIcon,
} from "lucide-react";
import React from "react";

export default function UserProfileDrpMenuContent() {
  return (
    <>
      <div>
        {/* Profile */}
        <div className="text-white mt-1 cursor-pointer p-2 pl-2 hover:bg-[#474747] flex rounded-sm text-sm">
          <div>
            <UserRoundPenIcon size={20} className="mr-1.5 text-white/80" />
          </div>
          <div>Profile</div>
        </div>
        {/* Profile */}

        {/* Dashboard */}
        <div className="text-white mt-1 cursor-pointer p-2 pl-2 hover:bg-[#474747] hover: rounded-sm text-sm flex">
          <div>
            <LayoutDashboardIcon size={20} className="mr-1.5 text-white/80" />
          </div>
          <div>Dashboard</div>
        </div>
        {/* Dashboard */}

        {/* Post Job */}
        <div className="text-white mt-1 cursor-pointer p-2 pl-2 hover:bg-[#474747] flex rounded-sm text-sm">
          <div>
            <BriefcaseBusiness size={20} className="mr-1.5 text-white/80" />
          </div>
          <div>Post a job</div>
        </div>
        {/* Post Job */}
      </div>

      <Separator className="mt-2 mb-2 bg-white/25" />

      {/* Logout Button */}
      <div>
        <div className="w-full justify-end flex">
          <Button variant={"outline"} className="hover:bg-white/75">
            Logout
          </Button>
        </div>
      </div>
      {/* Logout Button */}
    </>
  );
}
