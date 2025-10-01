"use client";
import React from "react";
import Sidebar from "../jobs_available/test_comps/Sidebar";
import Main_body from "../jobs_available/test_comps/MainBody";
import { GreetingBar } from "./components.dashboard/Greeting";
import { Linechart } from "./components.dashboard/LineChart";
import { InterviewAccordian } from "./components.dashboard/AccordianInt";

export default function Page() {
  return (
    <>
      <div className="h-screen overflow-hidden text-white">
        <div className="flex h-full">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <Main_body>
            <div
              className="w-full h-full flex justify-center overflow-auto"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="max-w-5xl w-full py-2 px-5">
                <GreetingBar name="Ishan Jaiswal" />

                <div className="w-full my-2">
                  <div className="flex justify-between items-center w-full">
                    <div className="bg-black w-full p-1 rounded-md mx-1 font-sans">
                      <div className="bg-zinc-800 p-1 rounded-md">
                        <div>Overall Rating :</div>
                        <div className="text-xl text-yellow-400 font-medium">1405</div>
                      </div>
                    </div>
                    <div className="w-full bg-black p-1 rounded-md mx-1">
                      <div className="bg-zinc-800 rounded-md p-1">
                        <div className="font-sans">Total Interview :</div>
                        <div className="font-sans text-xl font-medium">10</div>
                      </div>
                    </div>
                    <div className="w-full bg-black p-1 rounded-md mx-1 font-sans">
                      <div className="bg-zinc-800 rounded-md p-1">
                        <div>Proficiency</div>
                        <div className="text-xl font-medium text-cyan-400">69%</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* TODO: Start here */}
                <div className="w-full my-2">
                  <div className="font-sans text-white/75">User Rating :</div>
                  <div className="flex items-center w-full">
                    <Linechart />
                  </div>
                </div>
                <div className="w-full">
                  <div className="text-white/75 font-sans">
                    Interviews given :{" "}
                  </div>
                  <div>
                    {/* Interview given accordian */}
                    <InterviewAccordian />
                  </div>
                </div>
              </div>
            </div>
          </Main_body>
        </div>
      </div>
    </>
  );
}
