"use client";
import React, { useState } from "react";
import Sidebar from "../jobs_available/test_comps/Sidebar";
import Main_body from "../jobs_available/test_comps/MainBody";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useInterviewRole } from "../store/useStore_Zustand";
import {
  Loader2,
  LucidePhoneCall,
  UserSearch,
  Video,
  VideoOff,
} from "lucide-react";
import Video_Feed from "../interview/components_tab/VideoFeedLoad";

export default function Page() {
  const [is_loading, set_is_loading] = useState<boolean>(false);
  const { job_role } = useInterviewRole();
  const [isVideoOn, setisVideoON] = useState<boolean>(false);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <Main_body>
          <div
            className="flex justify-center px-20 overflow-auto overflow-x-hidden"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE/Edge
            }}
          >
            <div className="">
              <div className="text-white justify-center flex font-bold scale-150 p-1 mt-4">
                Important Instructions
              </div>
              <div className="text-white/90 p-2">
                <div className="py-1 text-md">
                  1. You can click{" "}
                  {
                    <Button className="bg-red-700 hover:bg-red-800 scale-75">
                      <LucidePhoneCall />
                    </Button>
                  }{" "}
                  to end the interview. You will get a AI generated feedback and
                  a score according to your response.
                </div>
                <div className="py-1 text-md">
                  2. You can also use{" "}
                  <span className="font-semibold text-white">CODE EDITOR</span>{" "}
                  for answering code related questions by interviewee.
                </div>
                <div className="py-1 text-md">
                  3. Answer by voice feature will be enabled soon (working on
                  it).
                </div>
                <div className="py-1 text-md">
                  4. Till then you can answer by text message.
                </div>
                <div className="py-1 text-md">
                  5. Do not refresh the page while interview is going on. No
                  progress will be saved and you need to restart the
                  interviewee.
                </div>
                <div className="py-1 text-md">
                  6. Try to give interview with you camera ON{" "}
                  {
                    <Button
                      className="bg-gray-600 scale-75"
                      onClick={() => setisVideoON(!isVideoOn)}
                    >
                      {isVideoOn ? <Video /> : <VideoOff />}
                    </Button>
                  }
                  .
                </div>

                <div className="w-full justify-center flex mt-4">
                  <Button
                    className="text-black bg-white hover:scale-110 hover:bg-white/85"
                    onClick={() => setisVideoON(!isVideoOn)}
                  >
                    TEST CAMERA
                  </Button>
                </div>
                <Link href={"/interview"}>
                  <div className="w-full justify-center flex p-2 mt-3">
                    {is_loading ? (
                      <>
                        <Button
                          className="bg-[#363636] hover:scale-105 hover:bg-black flex items-center justify-center"
                          disabled
                        >
                          <Loader2 className="animate-spin m-1" />
                          Hold on ...
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="bg-[#363636] hover:scale-105 hover:bg-black"
                          onClick={() => set_is_loading(true)}
                        >
                          Proceed to Interview
                        </Button>
                      </>
                    )}
                  </div>
                </Link>
                <div className="scale-75 bg-black rounded-[26px]">
                  {isVideoOn ? (
                    <Video_Feed need_video={true} />
                  ) : (
                    <div>
                      <Video_Feed need_video={false} />
                    </div>
                  )}
                  {/* <Video_Feed need_video={true} /> */}
                </div>
              </div>
            </div>
          </div>
        </Main_body>
      </div>
    </div>
  );
}
