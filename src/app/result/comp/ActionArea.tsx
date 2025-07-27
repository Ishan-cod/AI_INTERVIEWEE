import React from "react";

type prop = {
  actionItems: [string];
};

export function ActionArea(prop: prop) {
  return (
    <>
      <div className="px-2 py-1 bg-black w-full rounded-lg items-center justify-center">
        <div className="h-full flex flex-col">
          <div
            className="text-yellow-300
                    text-lg font-semibold font-sans"
          >
            Area of action :
          </div>
          <div className="bg-zinc-800 py-2 px-1 rounded-lg my-1 font-sans h-full text-white/80">
            <div className="p-1">
              {prop.actionItems?.map((item, key) => (
                <div className="my-1">
                  {key + 1}: {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
