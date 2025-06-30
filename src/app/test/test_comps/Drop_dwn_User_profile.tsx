import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BriefcaseBusiness,
  ChevronDown,
  LayoutDashboardIcon,
  User,
  UserRoundPenIcon,
} from "lucide-react";
import React from "react";
export default function Drop_dwn_User_profile() {
  return (
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
        <Separator className="mt-2 mb-2 bg-white/25" />
        <div>
          <div className="text-white mt-1 cursor-pointer p-2 pl-2 hover:bg-[#474747] flex rounded-sm text-sm">
            <div>
              <UserRoundPenIcon size={20} className="mr-1.5 text-white/80" />
            </div>
            <div>Profile</div>
          </div>
          <div className="text-white mt-1 cursor-pointer p-2 pl-2 hover:bg-[#474747] hover: rounded-sm text-sm flex">
            <div>
              <LayoutDashboardIcon size={20} className="mr-1.5 text-white/80" />
            </div>
            <div>Dashboard</div>
          </div>
          <div className="text-white mt-1 cursor-pointer p-2 pl-2 hover:bg-[#474747] flex rounded-sm text-sm">
            <div>
              <BriefcaseBusiness size={20} className="mr-1.5 text-white/80" />
            </div>
            <div>Post a job</div>
          </div>
        </div>
        <div>
          <Separator className="mt-2 mb-2 bg-white/25" />
        </div>
        <div>
          <div className="w-full justify-end flex">
            <Button variant={"outline"} className="hover:bg-white/75">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
