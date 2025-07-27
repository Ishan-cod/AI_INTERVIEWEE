import React from "react";
import { QuestionAccordian } from "./QuestAccordian";
import { QuestionFeedback } from "../page";

type prop = {
  questions: QuestionFeedback[];
};

export function QuesAnalysis(prop: prop) {
  return (
    <>
      <div className="right bg-black p-2 rounded-lg my-1.5 w-full">
        <div className="">
          <div className="text-lg font-semibold py-1">Question wise analysis :</div>
          <div className="rounded-md p-2 my-1 bg-zinc-800">
            <QuestionAccordian questions={prop.questions}/>
          </div>
        </div>
      </div>
    </>
  );
}
