import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import React from "react";
import { QuestionFeedback } from "../page";

type prop = {
  questions: QuestionFeedback[];
};

export function QuestionAccordian(prop: prop) {
  return (
    <>
      <Accordion type="single" collapsible>
        {prop.questions?.map((questObj, key) => (
          <AccordionItem value={key.toString()}>
            <AccordionTrigger>
              <div className="flex justify-between w-full">
                <div className="text-md text-white/75 font-sans">
                  Ques {key + 1}: {questObj.question}
                </div>
                <div>
                  <Badge variant={"secondary"}>{questObj.score}/10</Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <div>
                  <div className="flex items-center my-1">
                    <div className="text-lg font-sans mx-1 text-white/75">
                      Points :{" "}
                    </div>
                    <span className="text-lg text-yellow-300 font-semibold">
                      {questObj.score}
                    </span>
                    <span className="text-lg font-semibold">/10</span>
                  </div>

                  <div className="p-1 w-full flex-col">
                    <div className="text-lg text-white/75 mb-1">Topics : </div>
                    <div className="flex w-full flex-wrap">
                      <Badge
                        className="py-2 text-md font-semibold"
                        variant={"secondary"}
                      >
                        {questObj.topic}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-1">
                    <div className="text-md text-white/60 my-1 text-lg">
                      Feedback :
                    </div>
                    <div>{questObj.feedback}</div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
