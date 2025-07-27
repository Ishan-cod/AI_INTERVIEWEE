import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudUpload } from "lucide-react";
import Link from "next/link";
import { useInterviewRole } from "@/app/store/useStore_Zustand";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { redirect } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function UploadResumeDialog({
  job_role,
  company,
  job_id,
}: {
  job_role: string;
  company: string;
  job_id: string;
}) {
  const [is_loading, set_is_loading] = useState(false);
  const { setJobRole } = useInterviewRole();
  const { setUser, user } = useInterviewRole();

  const handle_click = async () => {
    if (!user || user.length == 0) {
      alert("Please enter the name of the user");
      set_is_loading(false);
    } else {
      set_is_loading(true);
      setJobRole(job_role);
      try {
        await axios.post("/api/set_cookie_job", {
          job_id: job_id,
        });
      } catch (error) {
        alert("ERROR");
        redirect("/jobs_available");
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-purple-500 via-blue-400 to-teal-300 ml-[7px] text-white hover:scale-110">
            <div className={`${inter.className}`}>Take Interview</div>
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-[#1A1A1A] border-0">
          <div>
            <Card className="bg-[#292929] border-0">
              <CardHeader>
                <CardTitle>
                  <div className="text-white">
                    Applying for Role of {job_role}
                  </div>
                </CardTitle>
                <CardDescription>
                  <div className="text-white opacity-60">
                    Please provide the following details to apply for the role
                    in {company}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="m-2">
                  <div className="text-white mb-2">
                    Please enter your name here...
                  </div>
                  <Input
                    type="text"
                    className="text-white border-1 border-b-white"
                    placeholder="Your name"
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>
                <div
                  className="border-dotted w-full h-full border-4 rounded-xl justify-center items-center flex hover:opacity-70 cursor-pointer"
                  onClick={() => alert("Feature awaited")}
                >
                  <div className="items-center justify-center">
                    <div className=" justify-center items-center flex">
                      <CloudUpload size={50} color="white" className="mt-2 " />
                    </div>
                    <div className="text-lg mt-2 text-white">
                      Click here to upload your resume
                    </div>
                    <div className="justify-center flex items-center text-sm opacity-70 text-white mb-2">
                      Max size : 5 Mb
                    </div>
                  </div>
                </div>

                <div className=" justify-end flex mt-8">
                  <DialogClose>
                    <div className="mr-3">
                      <Button className="hover:bg-neutral-700">Cancel</Button>
                    </div>
                  </DialogClose>
                  <div>
                    {!user || user.length == 0 ? (
                      <Button disabled>Proceed</Button>
                    ) : (
                      <Link href={"/check_device"}>
                        {!is_loading ? (
                          <Button
                            className="bg-white text-black hover:bg-gray-300"
                            onClick={handle_click}
                          >
                            Proceed
                          </Button>
                        ) : (
                          <Button disabled>
                            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
                            Proceed
                          </Button>
                        )}
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
