import { ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

interface LoggedinUser {
  name: string;
  email: string;
}
export default function RecentLogin(props: LoggedinUser) {
  const handleClick = () => {
    redirect("/jobs_available");
  };

  if (props.email === "" || props.name === "") return null;

  return (
    <>
      <div className="py-2">
        <div className="text-muted-foreground text-sm py-2">Recent Login </div>
        <div
          className="text-white w-full rounded-md bg-[#2c2c2c] py-1  hover:cursor-pointer hover:bg-zinc-800"
          onClick={handleClick}
        >
          <div className="flex justify-between items-center">
            <div className="px-3">
              <div>{props.name}</div>
              <div className="text-sm text-muted-foreground">{props.email}</div>
            </div>
            <div>
              <ChevronRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
