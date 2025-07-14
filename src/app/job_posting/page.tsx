import React from "react";
import Sidebar from "../jobs_available/test_comps/Sidebar";
import Main_body from "../jobs_available/test_comps/MainBody";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <Main_body>
            <div className="w-full flex items-center justify-around m-1 mt-4 p-3 border-b border-white/55">
              <div className="text-white text-xl font-medium font-mono ">
                Enter the details for the 'JOB ROLE'
              </div>
              <Button className="rounded-sm hover:scale-110 hover:cursor-pointer bg-white/90 text-black text-md hover:bg-white/90 ml-3">
                Post Job
              </Button>
            </div>
            <div
              className="pr-30 pl-30 overflow-auto"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE/Edge
              }}
            >
              <div>
                <div className="text-white p-2">Enter Job Title</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  type="text"
                  placeholder="Job Role"
                />
              </div>
              <div>
                <div className="text-white p-2">Enter Salary</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  placeholder="Salary in figure"
                  type="number"
                />
              </div>
              <div>
                <div className="text-white p-2">Enter city</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  placeholder="Eg : Pune"
                />
              </div>
              <div>
                <div className="text-white p-2">Enter Country</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  value={"India"}
                />
              </div>
              <div>
                <div className="text-white p-2">Enter your company name</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  placeholder="Eg : Google"
                />
              </div>
              <div>
                <div className="text-white p-2">
                  Experience Required {"(in years)"}
                </div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  type="number"
                  placeholder="eg: 4  ( default : Freshers )"
                />
              </div>
              <div>
                <div className="text-white p-2">Enter Job Description</div>
                <Textarea
                  placeholder="Enter Job Description"
                  className="text-white border-0 bg-[#2b2b2b]"
                />
              </div>
              <div>
                <div className="text-white">Skills Required</div>
                <Input className="text-white border-0 bg-[#2b2b2b]" />
              </div>

              <div className="flex items-center justify-end mt-2 pt-2">
                <Button className="rounded-sm hover:scale-110 hover:cursor-pointer bg-white/90 text-black text-md hover:bg-white/90">
                  Post Job
                </Button>
              </div>
            </div>
          </Main_body>
        </div>
      </div>
    </>
  );
}
