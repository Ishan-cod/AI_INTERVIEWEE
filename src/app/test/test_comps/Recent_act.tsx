import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export default function Recent_act() {
  return (
    <div className="flex justify-between items-center m-0.5 rounded-sm p-2 hover:bg-[#212121] mt-2 cursor-pointer">
      <div className={`text-white/85 text-sm ${inter.className}`}>
        Frontend developer
      </div>
      <div className="text-xs text-white/50">23/12/25</div>
    </div>
  );
}
