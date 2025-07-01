"use client";
import React from "react";
import ROBO from "./components/spline_robo";
import { Card, CardContent } from "@/components/ui/card";

export default function page() {
  return (
    <>
      <div className="w-full h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex">
        {/* Left: Signup Form */}
        <div className="w-1/2 h-full flex items-center justify-center backdrop-blur-md p-10">
          <Card className="w-full max-w-lg shadow-xl rounded-2xl">
            <CardContent className="p-8"></CardContent>
          </Card>
        </div>

        {/* Right: Full Robot */}
        <div className="h-full w-full">
          <ROBO />
        </div>
      </div>
    </>
  );
}
