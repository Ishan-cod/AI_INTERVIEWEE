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
      <FloatingNavbar />
      <HeroArea />
      <FloatingFooter />
    </>
  );
}
