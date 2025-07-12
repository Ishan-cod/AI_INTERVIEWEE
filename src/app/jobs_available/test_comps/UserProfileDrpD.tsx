import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import Profile_Card from "./ProfileCard";
import UserProfileDropDownContent from "./UserProfileDrpMenu";

export default function User_profile_drpdwn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full border-0">
        <Profile_Card />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="start"
        className="border-0 bg-[linear-gradient(145deg,_#1e1e1e,_#2a2a2a)] text-white p-1"
      >
        <UserProfileDropDownContent />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
