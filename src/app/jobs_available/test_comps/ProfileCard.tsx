import { useLoginStore } from "@/app/store/useStore_Zustand";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { ChevronDown, User } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function ProfileCard() {
  const { name ,setName} = useLoginStore();

  //TODO: Uncomment this 
  
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get("/api/auth/check_cookie");
        const username = response.data.token.username;
        setName(username);
      } catch (error) {
        redirect("/user_login");
      }
    };

    checkToken();
  }, []);

  return (
    <Card className="bg-[#212121] rounded-lg h-12 justify-center border-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <div className=" bg-white flex ml-1 mr-2 rounded-lg w-[35px] h-[35px] items-center justify-center">
            <User />
          </div>
          <div className="">
            <div className="justify-items-start items-center">
              <div className="font-semibold mb-0 text-white">{name}</div>
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
