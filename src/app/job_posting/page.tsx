import React from "react";
import Sidebar from "../jobs_available/test_comps/Sidebar";
import Main_body from "../jobs_available/test_comps/MainBody";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function page() {
  return (
    <>
      <div className="h-screen overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <Main_body>
            <div className="pr-30 pl-30">
              <div>
                <div className="text-white">Enter Job Title</div>
                <Input className="text-white" type="text" placeholder="Job Role" />
              </div>
              <div>
                <div className="text-white">Enter Salary</div>
                <Input className="text-white" placeholder="Salary in figure" type="number" />
              </div>
              <div>
                <div className="text-white">Enter city</div>
                <Input className="text-white" placeholder="Eg : Pune" />
              </div>
              <div>
                <div className="text-white">Enter Country</div>
                <Input className="text-white" value={"India"} />
              </div>
              <div>
                <div className="text-white">Enter your company name</div>
                <Input className="text-white" placeholder="Eg : Google" />
              </div>
              <div>
                <div className="text-white">Experience Required</div>
                <Input className="text-white" type="number" placeholder="eg: 4 (No need to write year)" />
              </div>
              <div>
                <div className="text-white">Enter Job Description</div>
                <Textarea
                  placeholder="Enter Job Description"
                  className="text-white"
                />
              </div>
            </div>
          </Main_body>
        </div>
      </div>
    </>
  );
}
