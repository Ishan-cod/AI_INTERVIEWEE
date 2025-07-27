"use client";
import React, { useEffect, useState, Suspense } from "react";
import Main_body from "../jobs_available/test_comps/MainBody";
import Sidebar from "../jobs_available/test_comps/Sidebar";
import { QuesAnalysis } from "./comp/QuesAnalyis";
import { ActionArea } from "./comp/ActionArea";
import { ConclusionArea } from "./comp/ConclusionArea";
import { StrengthArea } from "./comp/StrengthArea";
import { useSearchParams } from "next/navigation";
import animation from "@/Animations/Infinity animation.json";
import errorAnimation from "@/Animations/404_animation.json";
import Lottie from "lottie-react";
import axios from "axios";

interface PerformanceResult {
  _id: string;
  overall_score: number;
  hireable: boolean;
  question_feedback: QuestionFeedback[];
  strengths: Strength[];
  action_items: string[];
  concluding_statement: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface QuestionFeedback {
  question: string;
  feedback: string;
  topic: string;
  score: number;
}

interface Strength {
  topic: string;
  detail: string;
}

interface PerformanceResponse {
  result: PerformanceResult;
}

function ResultContent() {
  const [InterviewResponse, setInterviewResponse] =
    useState<PerformanceResponse>();
  const [isloading, setisloading] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);
  const params = useSearchParams();
  const paramsHad = params.has("rid");
  const resultID = params.get("rid");

  useEffect(() => {
    if (!paramsHad) {
      setisError(true);
      return;
    }

    const getresult = async () => {
      setisloading(true);
      try {
        const response = await axios.post("/api/get-result", {
          rid: resultID,
        });

        setInterviewResponse(response.data as PerformanceResponse);
        setisloading(false);
        
        setTimeout(async () => {
          try {
            const saved_interview = await axios.post("/api/save_interview", {
              Performance_ID: resultID,
            });

            await axios.post("/api/save-userinterview", {
              Interview_id: saved_interview.data.interview_id,
            });
          } catch (error) {
            console.error("Interview details not saved");
            console.error(error);
          }
        }, 3000);
      } catch (error: any) {
        setisError(true);
        console.error(error._message);
        setisloading(false);
      }
    };
    
    getresult();
  }, [paramsHad, resultID]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <Main_body>
          {isError ? (
            <div className=" p-2 flex items-center justify-center h-screen">
              <Lottie
                animationData={errorAnimation}
                loop={true}
                className="scale-50"
              />
            </div>
          ) : isloading ? (
            <>
              <div className=" p-2 flex items-center justify-center h-screen">
                <Lottie
                  animationData={animation}
                  loop={true}
                  className="scale-75"
                />
              </div>
            </>
          ) : (
            <>
              <div
                className="text-white px-10 py-5 overflow-auto max-w-5xl mx-auto"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="px-2">
                  <div className="font-sans font-semibold text-xl">
                    Interview Analysis
                  </div>
                  <div className="text-white/60">
                    <div>
                      Here is the analysis for the role of Backend developer
                    </div>
                    <div>Posting by : ABC corporation</div>
                  </div>
                </div>

                <div className="flex justify-between my-1">
                  <div className="bg-black rounded-lg mr-1 p-2 w-full flex items-center">
                    <div className="text-xl font-semibold">SCORE :</div>
                    <div className="mx-2">
                      <span className="text-3xl text-yellow-400/95 font-semibold">
                        {InterviewResponse?.result.overall_score}
                      </span>
                      <span className="text-white/70">/100</span>
                    </div>
                  </div>
                  <div className="bg-black rounded-lg ml-1 p-2 w-full flex items-center">
                    <div className="text-lg font-semibold">STATUS :</div>
                    {InterviewResponse?.result.hireable ? (
                      <div className="px-1 text-green-400 text-md font-semibold">
                        HIRABLE
                      </div>
                    ) : (
                      <div className="px-1 text-red-400 text-md font-semibold">
                        NOT HIRABLE
                      </div>
                    )}
                  </div>
                </div>

                <div className="body flex my-1 mt-2">
                  <StrengthArea
                    strengthArea={
                      InterviewResponse?.result.strengths as Strength[]
                    }
                  />
                  <ActionArea
                    actionItems={
                      InterviewResponse?.result.action_items as [string]
                    }
                  />
                </div>

                <div className="">
                  <QuesAnalysis
                    questions={
                      InterviewResponse?.result
                        .question_feedback as QuestionFeedback[]
                    }
                  />
                </div>

                <div className="">
                  <ConclusionArea
                    conclusionStatement={
                      InterviewResponse?.result.concluding_statement as string
                    }
                  />
                </div>
              </div>
            </>
          )}
        </Main_body>
      </div>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        <Sidebar />
        <Main_body>
          <div className="p-2 flex items-center justify-center h-screen">
            <Lottie
              animationData={animation}
              loop={true}
              className="scale-75"
            />
          </div>
        </Main_body>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResultContent />
    </Suspense>
  );
}