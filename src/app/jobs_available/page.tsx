"use client";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Jobcard from "./test_comps/Jobcard";
import FilterButton from "./test_comps/Header_components/FilterButton";
import Sidebar from "./test_comps/Sidebar";
import MainBody from "./test_comps/MainBody";
import axios from "axios";
import Lottie from "lottie-react";
import animation from "@/Animations/Infinity animation.json";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface JobResponseData {
  _id: string;
  job_title: string;
  location: string;
  salary: number;
  skills_required: Array<string> | [];
  company_name: string;
  experience_required: string;
  job_description: string;
  created_at: string;
  __v: number;
}

interface JobResponse {
  data: Array<JobResponseData>;
}

export default function Page() {
  const [AllJobs, setAllJobs] = useState<Array<JobResponseData>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const JobDetail = async () => {
      try {
        const response = await axios.get("/api/get_all_jobs");
        const res_data: JobResponse = response.data;
        if (response.status == 200) {
          setAllJobs(res_data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Cannot fetch job details");
      }
    };

    JobDetail();
  }, []);

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

          {/*Job cards from DB*/}
          {loading ? (
            <div className=" p-2 flex items-center justify-center h-screen">
              <Lottie
                animationData={animation}
                loop={true}
                className="size-50"
              />
            </div>
          ) : (
            <div
              className="overflow-auto scrollbar-none"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div
                className="flex px-4 flex-wrap w-full justify-evenly break-words overflow-x-hidden"
                role="list"
              >
                {AllJobs.map((job) => (
                  <Jobcard
                    key={job._id}
                    job_id={job._id}
                    job_title={job.job_title}
                    company_name={job.company_name}
                    job_description={job.job_description}
                    country={"India"} // fallback
                    location={job.location}
                    salary={job.salary}
                    skills_required={job.skills_required}
                    experience_required={job.experience_required}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Job cards from DB*/}
        </MainBody>
        {/* Main Content */}
      </div>
    </div>
  );
}
