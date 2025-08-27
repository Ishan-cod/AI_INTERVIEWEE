import { Infinity } from "lucide-react";
import React from "react";
export default function HeroNavbar() {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <div className="p-1 flex justify-center items-center">
            <Infinity size={30} />
            <span className="font-medium text-lg px-1">&lt;AI/&gt;VUE</span>
          </div>
          <div className="p-1 flex justify-center items-center">
            <a href="https://github.com/Ishan-cod" target="_blank">
              <div className="text-muted-foreground font-sans ml-4 text-lg hover:bg-zinc-700 rounded-md p-1 px-2 hover:cursor-pointer hover:text-white/80">
                Github
              </div>
            </a>
          </div>
          <div className="p-1 flex justify-center items-center">
            <a
              href="https://www.linkedin.com/in/ishan-jaiswal-178b71313/"
              target="_blank"
            >
              <div className="text-muted-foreground font-sans ml-4 text-lg hover:bg-zinc-700 rounded-md p-1 px-2 hover:cursor-pointer hover:text-white/80">
                know the dev
              </div>
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <a href="/user_login" target="_blank">
            <div className="p-1 px-2 m-1 font-semibold font-sans hover:cursor-pointer hover:bg-zinc-700 rounded-lg">
            Get Started
          </div>
          </a>
          <a href="/signin" target="_blank">
            <div className="p-1 px-2 text-black bg-white rounded-md m-1 font-semibold font-sans hover:cursor-pointer hover:bg-white/80">
              Login
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
