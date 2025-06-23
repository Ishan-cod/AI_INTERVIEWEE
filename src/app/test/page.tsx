"use client";

import React from "react";
import Jobcard from "./test_comps/Jobcard";
import Herocard from "./test_comps/Cardhero";
import { Inter, Roboto } from "next/font/google";
import { Button, DropdownMenu } from "@heroui/react";
import { ArrowDown, ArrowUp01Icon, ChevronDown } from "lucide-react";
import Filter_button from "./test_comps/Header_components/Filter_button";
import Sidebar from "./test_comps/Sidebar";
import Main_body from "./test_comps/Main_body";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function page() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}

        <Sidebar />
        {/* Main Content */}
        <Main_body>
          <div className="sticky top-0 z-20 h-[61px] flex justify-between items-center px-6 bg-[#1C1C1F]/70 backdrop-blur-md border-b border-white/10">
            <div className={`${inter.className} text-white text-xl`}>
              Interviews Available
            </div>

            <Filter_button />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto hide-scrollbar px-4 py-2 space-y-2">
            {[...Array(4)].map((_, i) => (
              <div className="jobcard flex justify-center gap-4" key={i}>
                <Jobcard />
                <Jobcard />
                <Jobcard />
              </div>
            ))}
          </div>
        </Main_body>
      </div>
    </div>
  );
}
