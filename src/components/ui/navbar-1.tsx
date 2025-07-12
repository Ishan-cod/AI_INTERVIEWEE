import React, { useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { Github, Linkedin, Loader2 } from "lucide-react";

const FloatingNavbar = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md shadow-xl rounded-full px-6 py-2 flex items-center gap-6 z-50">
      <Link href={"#"}>
        <Button
          variant={"outline"}
          className="text-gray-800 font-semibold hover:text-blue-500 transition"
        >
          Home
        </Button>
      </Link>
      <Link href={"#"}>
        <Button
          variant={"outline"}
          className="bg-blue-400 hover:bg-blue-600 hover:scale-110 hover:text-white"
        >
          LinkedIn
        </Button>
      </Link>
      <Link href={"#"}>
        <Button
          variant={"outline"}
          className="bg-black text-white hover:bg-[#212121] hover:text-white hover:scale-110"
        >
          Github
        </Button>
      </Link>
      <Link href={"/jobs_available"}>
        {!isLoading ? (
          <Button
            onClick={() => setisLoading(!isLoading)}
            variant={"outline"}
            className="rounded-xl shadow-xl transition-all duration-700 ease-in-out bg-gradient-to-r from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4] hover:from-[#FFDEE9] hover:via-[#B5FFFC] hover:to-[#FFDEE9] hover:scale-110"
          >
            Start Interview
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className="rounded-xl shadow-xl transition-all duration-700 ease-in-out bg-gradient-to-r from-[#7F7FD5] via-[#86A8E7] to-[#91EAE4] hover:from-[#FFDEE9] hover:via-[#B5FFFC] hover:to-[#FFDEE9] hover:scale-110"
            disabled
          >
            <Loader2 className="animate-spin" />
            Start Interview
          </Button>
        )}
      </Link>
    </nav>
  );
};

export default FloatingNavbar;
