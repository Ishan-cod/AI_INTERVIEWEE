"use client";
import React, { useState } from "react";
import Sidebar from "../jobs_available/test_comps/Sidebar";
import Main_body from "../jobs_available/test_comps/MainBody";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SkillTag from "./components.job/SkillTag";
import axios from "axios";
import { CircleCheckBig, Clock, Loader2, X, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useSkillStore } from "../store/useStore_Zustand";

export default function Page() {
  const initial_skillset: Array<string> = [
    "Communication",
    "Problem Solving",
    "Teamwork",
    "Time Management",
    "Adaptability",
    "Critical Thinking",
    "Creativity",
    "Attention to Detail",
    "Project Management",
    "Agile Methodology",
    "Scrum",
    "Git",
    "GitHub",
    "HTML",
  ];
  const [JobTitle, setJobTitle] = useState<string>("");
  const [Salary, setSalary] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [Company, setCompany] = useState<string>("");
  const [skills, setSkillArr] = useState<Array<string>>(initial_skillset);
  const [Experience, setExperience] = useState<string>("0");
  const [JobDesc, setJobDesc] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [add_skill, set_add_skill] = useState<string>("");
  const { skills_Array, setSkills } = useSkillStore();

  const handleblur = async () => {
    try {
      const response: any = await axios.post(
        "/api/artificial_int/skill_suggest",
        {
          job_role: JobTitle,
        }
      );

      const array = response.data.Skillset.skills;
      if (!array || array.length === 0) {
        console.error("Cannot fetch details");
      } else {
        setSkillArr(array);
      }
    } catch (e: any) {
      console.log(e.response);
    }
  };

  const handleSubmit = async () => {
    setisLoading(true);

    if (
      !JobTitle ||
      !Salary ||
      Salary == 0 ||
      city == "" ||
      Company == "" ||
      JobDesc == ""
    ) {
      toast(
        <span className="text-red-500 font-semibold text-md">
          Please enter all the fields of the form
        </span>,
        {
          icon: <X className="text-red-500" />,
        }
      );
      setisLoading(false);
    } else {
      if (Experience == "0") {
        setExperience("Freshers");
      }
      toast(<span>Job creation in Process</span>, {
        icon: <Clock className="animate-spin" />,
        description: (
          <>
            <div className="text-sm text-zinc-500 leading-relaxed">
              Please wait while we create a job posting
            </div>
          </>
        ),
      });
      try {
        const response = await axios.post("/api/set_job", {
          job_title: JobTitle,
          location: city,
          country: "India",
          salary: Salary,
          skills_required: skills_Array,
          company_name: Company,

          experience_required: Experience,
          job_description: JobDesc,
        });

        if (response.status == 200) {
          setisLoading(false);

          toast(<span>Job Posting created successfully</span>, {
            icon: <CircleCheckBig className="animate-bounce text-green-500" />,
            duration: 5000,
            description: (
              <>
                <div className="text-sm text-zinc-500 leading-relaxed">
                  Your job posting is created successfully!
                  <br />
                  <span className="text-green-400 font-semibold">
                    Thank You
                  </span>
                </div>
              </>
            ),
          });
        } else {
          setisLoading(false);

          toast(
            <span className="font-semibold text-red-600">
              Job Creation Failed
            </span>,
            {
              icon: <XCircle className="text-red-500" />,
              description: (
                <div className="text-sm text-gray-700 mt-1 space-y-1">
                  <div>We couldn’t create your job post.</div>
                  <div>Please try again or check your internet connection.</div>
                </div>
              ),
              duration: 6000,
              className: "bg-white border border-gray-200 rounded-xl shadow-md",
            }
          );
          console.log(response.data.message);
        }
      } catch (error) {
        setisLoading(false);
        console.error("Error creating job role");
      }
    }
  };

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
              {!isLoading ? (
                <Button
                  className="rounded-sm hover:scale-110 hover:cursor-pointer bg-white/90 text-black text-md hover:bg-white/90 ml-3"
                  onClick={handleSubmit}
                >
                  Post Job
                </Button>
              ) : (
                <Button
                  className="rounded-sm hover:scale-110 hover:cursor-pointer bg-white/90 text-black text-md hover:bg-white/90 ml-3"
                  disabled
                >
                  <Loader2 className="animate-spin" />
                  Post Job
                </Button>
              )}
            </div>
            <div
              className="pr-30 pl-30 overflow-auto truncate"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div>
                <div className="text-white p-2">Enter Job Title</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  type="text"
                  placeholder="Job Role"
                  onChange={(e) => setJobTitle(e.target.value)}
                  onBlur={handleblur}
                />
              </div>
              <div>
                <div className="text-white p-2">Enter Salary</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  placeholder="Salary in figure"
                  type="number"
                  onChange={(e) => setSalary(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="text-white p-2">Enter city</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  placeholder="Eg : Pune"
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <div className="text-white p-2">Enter Country</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  value={"India"}
                  readOnly
                />
              </div>
              <div>
                <div className="text-white p-2">Enter your company name</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  placeholder="Eg : Google"
                  onChange={(e) => setCompany(e.target.value)}
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
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <div>
                <div className="text-white p-2">Enter Job Description</div>
                <Textarea
                  placeholder="Enter Job Description"
                  className="text-white border-0 bg-[#2b2b2b]"
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>
              <div>
                <div className="text-white">Skills Required</div>
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  placeholder="Select skills"
                  readOnly
                  value={skills_Array.join(", ")}
                />
              </div>

              <div className="flex flex-wrap w-full overflow-x-hidden break-words justify-between">
                {skills.map((skill, i) => (
                  <SkillTag skill={skill} key={i} />
                ))}
              </div>

              <div className="text-white mt-3">Any other Skills</div>
              <div className="flex items-center justify-center">
                <Input
                  className="text-white border-0 bg-[#2b2b2b]"
                  type="text"
                  placeholder="Additional skills here"
                  value={add_skill}
                  onChange={(e) => set_add_skill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      if (add_skill !== "") {
                        setSkills(add_skill.trim());
                        set_add_skill("");
                      }
                    }
                  }}
                />
                <Button
                  className="text-black bg-white/85 m-2 hover:scale-105 hover:bg-white"
                  onClick={() => {
                    if (add_skill !== "") {
                      setSkills(add_skill.trim());
                      set_add_skill("");
                    }
                  }}
                >
                  Add
                </Button>
              </div>

              <div className="flex items-center justify-end mt-2 pt-2">
                {!isLoading ? (
                  <Button
                    className="rounded-sm hover:scale-110 hover:cursor-pointer bg-white/90 text-black text-md hover:bg-white/90 ml-3"
                    onClick={handleSubmit}
                  >
                    Post Job
                  </Button>
                ) : (
                  <Button
                    className="rounded-sm hover:scale-110 hover:cursor-pointer bg-white/90 text-black text-md hover:bg-white/90 ml-3"
                    disabled
                  >
                    <Loader2 className="animate-spin" />
                    Post Job
                  </Button>
                )}
              </div>
            </div>
          </Main_body>
        </div>
      </div>
    </>
  );
}
