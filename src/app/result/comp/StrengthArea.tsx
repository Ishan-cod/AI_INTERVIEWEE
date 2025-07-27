import { Badge } from "@/components/ui/badge";
import React from "react";
import { StrengthTooltip } from "./StrengthTooltip";

interface Strength {
  topic: string;
  detail: string;
}

type props = {
  strengthArea: Strength[];
};

export function StrengthArea(props: props) {
  return (
    <>
      <div className="left bg-black rounded-lg mr-1 p-2">
        <div className="h-full flex flex-col">
          <div className="text-lg font-semibold">Strengths :</div>
          <div className="h-full">
            <div className="w-full min-w-sm bg-zinc-800 p-1 rounded-lg h-full">
              <div className="flex flex-wrap m-1">
                {props.strengthArea?.map((strengthObj, key) => (
                  <StrengthTooltip
                    strength={strengthObj.topic}
                    detail={strengthObj.detail}
                    key={key}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
