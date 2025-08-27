"use client";
import { Button } from "@/components/ui/button";
import HeroNavbar from "@/components/ui/heronavbar";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import React from "react";
const words = [
  {
    text: "Nervous",
    className: "text-white",
  },
  {
    text: "about",
    className: "text-white",
  },
  {
    text: "your",
    className: "text-white",
  },
  {
    text: "next",
    className: "text-white",
  },
  {
    text: "big",
    className: "text-white",
  },
  {
    text: "interview",
    className: "text-blue-500",
  },
  {
    text: "?",
    className: "text-white",
  },
];
export default function Page() {
  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        className="overflow-y-scroll hide-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="bg-[#030303] text-white fixed top-0 left-0 right-0 z-50">
          <HeroNavbar />
        </div>
        <div className="text-white bg-[#030303] h-screen flex justify-center flex-wrap pt-16">
          <div className="max-w-6xl flex items-center justify-center flex-wrap">
            <div className="flex flex-col items-center">
              <h1>
                <TypewriterEffectSmooth words={words} />
              </h1>
              <h1
                className="max-w-2xl text-center font-normal p-1 mt-1.5 text-white/75"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
              >
                Let our AI Interviewee challenge you with realistic,
                role-specific questions — from Software Engineer to Product
                Manager, from Data Scientist to Designer.
              </h1>
              <div className="flex mt-10 w-full justify-evenly p-2.5">
                <a href="/signin" target="_blank">
                  <Button className="mx-2 px-9 scale-110" variant={"ghost"}>
                    Post job
                  </Button>
                </a>
                <a href="/signin" target="_blank">
                  <Button className="mx-2 scale-110" variant={"secondary"}>
                    Get interviewed
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="main bg-[#030303] text-white">hi this is test</div> */}
      </div>
    </>
  );
}
