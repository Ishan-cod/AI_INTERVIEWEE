"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../test/test_comps/Sidebar";
import Main_body from "../test/test_comps/Main_body";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, SquareCheckBig } from "lucide-react";
import { Divider } from "@heroui/react";
import { Separator } from "@/components/ui/separator";

import { Editor } from "@monaco-editor/react";

import { Language_Changer } from "./components_tab/language_dropdown";
import { Inter, Jaini_Purva, Roboto, Roboto_Mono } from "next/font/google";
import Code_Editor from "./components_tab/Code_editor";
import AI_Message from "./components_tab/CHAT/AI_message";
import Human_message from "./components_tab/CHAT/Human_message";
import { useRouter, useSearchParams } from "next/navigation";
import Camera_bar from "../check_device/components_check/Camera_bar";
import Video_BOX from "./components_tab/Video_call";
import Message_BOX from "./components_tab/Message_area";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto_mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

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

export default function page() {
  const search_params = useSearchParams();
  const router = useRouter();
  const [language, set_language] = useState(search_params.get("lang"));

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
        <Main_body>
          <div className="flex h-screen">
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
                        <Language_Changer />
                      </div>
                      <div>
                        <Button className="m-1.5 mt-1 mb-0">
                          <SquareCheckBig />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full p-1.5">
                    {/* Code editor */}
                    {language == "cpp" && (
                      <Code_Editor
                        language="cpp"
                        default_code={default_code_obj[0].cpp}
                      />
                    )}
                    {language == "java" && (
                      <Code_Editor
                        language="java"
                        default_code={default_code_obj[0].java}
                      />
                    )}
                    {language == "javascript" && (
                      <Code_Editor
                        language="javascript"
                        default_code={default_code_obj[0].javascript}
                      />
                    )}
                    {language == "python" && (
                      <Code_Editor
                        language="python"
                        default_code={default_code_obj[0].python}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-4/10 flex items-center justify-center p-2 pl-0">
              <div className="bg-[#09090B] h-full w-full rounded-lg  rounded-b-lg flex flex-col">
                {/* message */}
                <Message_BOX/>
                {/* Video call */}
                <Video_BOX/>
              </div>
            </div>
          </div>
        </Main_body>
      </div>
    </div>
  );
}
