import { Button } from "@/components/ui/button";
import React from "react";

export function GreetingBar({ name }: { name: string }) {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="left_side">
        <div className="font-sans w-full text-2xl font-medium py-1">
          Good to see you, {name}.
        </div>
        <div className="text-white/70 font-sans">
          <div>Preparing for interviews feels tiresome 😫, </div>
          <div>Relax we got you covered 😎</div>
        </div>
      </div>
      <div>
        <Button variant={"secondary"} className="text-md">
          Interview?
        </Button>
      </div>
    </div>
  );
}
