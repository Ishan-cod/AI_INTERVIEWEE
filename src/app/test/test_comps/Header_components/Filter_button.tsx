import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function Filter_button() {
  return (
    <div>
      <Button
        className="bg-[#313131] rounded-[8px] w-[98px] h-[39px] text-white font-semibold hover:bg-[#292929] flex items-center justify-center gap-1"
        onClick={() => alert("Sorry! This feature awaited")}
      >
        <span className={`${roboto.className}`}>Filter</span>
        <ChevronDown size={20} />
      </Button>
    </div>
  );
}
