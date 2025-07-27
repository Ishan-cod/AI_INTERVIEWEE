import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface Tooltip {
  strength: string;
  detail: string;
}

export function StrengthTooltip(prop: Tooltip) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant={"secondary"} className="text-md m-1">
            {prop.strength}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black p-3">
          <h2>{prop.detail}</h2>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
