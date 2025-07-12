"use client";

import React from "react";
import Jobcard from "./test_comps/Jobcard";

import { Inter } from "next/font/google";

import FilterButton from "./test_comps/Header_components/FilterButton";
import Sidebar from "./test_comps/Sidebar";
import MainBody from "./test_comps/MainBody";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Page() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <MainBody>
          {/* NAVBAR */}

          <div className="sticky top-0 z-20 h-[61px] flex justify-between items-center px-6 bg-[#1C1C1F]/70 backdrop-blur-md border-b border-white/10">
            <div className={`${inter.className} text-white text-xl`}>
              Interviews Available
            </div>

            <FilterButton />
          </div>

          {/* NAVBAR */}

          {/* Job cards from DB TODO: */}
          <div className="flex-1 overflow-auto hide-scrollbar px-4 py-2 space-y-2">
            {[...Array(4)].map((_, i) => (
              <div className="jobcard flex justify-center gap-4" key={i}>
                <Jobcard />
                <Jobcard />
                <Jobcard />
              </div>
            ))}
          </div>
          {/* Job cards from DB TODO: */}

        </MainBody>
        {/* Main Content */}
      </div>
    </div>
  );
}
