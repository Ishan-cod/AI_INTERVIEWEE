import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  BriefcaseBusiness,
  ChevronDown,
  LayoutDashboardIcon,
  User,
  UserRoundPenIcon,
} from "lucide-react";
import React from "react";
import Profile_Card from "./Profile_Card";
import Drop_dwn_User_profile from "./Drop_dwn_User_profile";

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
        <Drop_dwn_User_profile />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
