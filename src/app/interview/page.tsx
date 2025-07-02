"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../test/test_comps/Sidebar";
import MainBody from "../test/test_comps/MainBody";

import { Button } from "@/components/ui/button";
import { SquareCheckBig } from "lucide-react";
import { LanguageChanger } from "./components_tab/LanguageDropdown";
import { Inter } from "next/font/google";
import CodeEditor from "./components_tab/CodeEditor";

import { useRouter, useSearchParams } from "next/navigation";

import VideoBox from "./components_tab/VideoArea";
import MessageBox from "./components_tab/MessageAreaHandler";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// const roboto = Roboto({
//   subsets: ["latin"],
//   variable: "--font-roboto",
// });

const default_code_obj = [
  {
    cpp: `#include<iostream>
using namespace std;
int main()
{
  //Your code here...

  return 0;
}`,

    java: `public class Main {
    public static void main(String[] args) {
        // Your code starts here
        System.out.println("Hello, World!");
    }
}
`,

    javascript: `//Your code here
    `,
    python: `#Your code here...`,
  },
];

export default function Page() {
  const search_params = useSearchParams();
  const router = useRouter();
  const [language, set_language] = useState(search_params.get("lang"));

  // Params update for accessing language of editor
  useEffect(() => {
    if (!search_params.has("lang")) {
      set_language("javascript");
      const newURL = new URL(window.location.href);
      newURL.searchParams.set("lang", "javascript");
      router.replace(newURL.toString());
    } else {
      set_language(search_params.get("lang"));
    }
  }, [search_params]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="h-full flex">
        <Sidebar />
        <MainBody>
          <div className="flex h-screen">

            {/* Code Editor area starts */}

            <div className="h-screen flex-6/10">
              <div className="flex justify-center items-center h-full p-2">
                <div className="bg-[#09090B] h-full w-full rounded-lg overflow-hidden">
                  <div className=" w-full flex  justify-between items-center">
                    <div className="flex items-center m-0 pt-2">
                      <div
                        className={`text-md text-white ml-2.5 ${inter.className}`}
                      >
                        Code Editor
                      </div>
                    </div>
                    <div className="flex">
                      <div className="m-1.5 mt-1 mb-0">
                        <LanguageChanger />
                      </div>
                      <div>
                        <Button className="m-1.5 mt-1 mb-0">
                          <SquareCheckBig />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full p-1.5">
                    {/* Code editors */}
                    {language == "cpp" && (
                      <CodeEditor
                        language="cpp"
                        default_code={default_code_obj[0].cpp}
                      />
                    )}
                    {language == "java" && (
                      <CodeEditor
                        language="java"
                        default_code={default_code_obj[0].java}
                      />
                    )}
                    {language == "javascript" && (
                      <CodeEditor
                        language="javascript"
                        default_code={default_code_obj[0].javascript}
                      />
                    )}
                    {language == "python" && (
                      <CodeEditor
                        language="python"
                        default_code={default_code_obj[0].python}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Code Editor area ends */}

            <div className="flex-4/10 flex items-center justify-center p-2 pl-0">
              <div className="bg-[#09090B] h-full w-full rounded-lg  rounded-b-lg flex flex-col">
                {/* message */}
                <MessageBox />
                {/* Video call */}
                <VideoBox />
              </div>
            </div>
          </div>
        </MainBody>
      </div>
    </div>
  );
}
