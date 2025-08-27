import React, { useRef, useState } from "react";
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
import {
  Check,
  CircleCheckBig,
  CloudUpload,
  FileInput,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useInterviewRole } from "@/app/store/useStore_Zustand";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { ProgressBar } from "@/components/upload/progress-bar";
import { Progress } from "@/components/ui/progress";
// import { MultiFileDropzoneUsage } from "./FileUpload";

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
  const { edgestore } = useEdgeStore();
  const [is_loading, set_is_loading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const { setJobRole } = useInterviewRole();
  const { setUser, user } = useInterviewRole();
  const [files, setfiles] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [fileName, setFileName] = useState<string | undefined>("");
  const [fileUrl, setfileUrl] = useState<string|null>(null)
  // const [fileUrl,]
  // let fileUrl: string | null = null;

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (!file) {
      console.log("ERROR");
    } else {
      console.log(file);
      // console.log(file.item(0)?.name)
      setFileName(file.item(0)?.name.toString());
      setfiles(file[0]);
    }
  };
  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const resetState = () => {
    setfiles(null);
    setProgress(0);
    setFileName("");
    setUploadLoading(false);
  };

  const cancelUpload = async () => {
    console.log(fileUrl)
    if (fileUrl != null) {
      await edgestore.publicFiles.delete({
        url: fileUrl,
      });
    }

    setfileUrl(null)
    resetState();
  };

  const handleUploadClick = async () => {
    if (!files) {
      console.error("File not found");
    } else {
      setUploadLoading(true);
      const res = await edgestore.publicFiles.upload({
        file: files,
        onProgressChange: (p) => {
          setProgress(p);
        },
      });

      // fileUrl = res.url;
      setfileUrl(res.url)
      // console.log(res.url);
    }

    setUploadLoading(false);
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
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileInputRef}
          />

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
                <div className="mb-3 mt-2">
                  <Input
                    type="text"
                    className="text-white border-0 bg-zinc-700  "
                    placeholder="Enter your name"
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>

                <div
                  className="border-dotted w-full h-full border-4 rounded-xl justify-center items-center flex hover:opacity-70 cursor-pointer"
                  onClick={handleDivClick}
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

                {files != null ? (
                  <div className="text-white p-1 my-2 flex justify-between items-center py-2">
                    <div className="w-full">
                      <div className="w-full overflow-ellipsis overflow-hidden">
                        {fileName}
                      </div>
                      <div className="w-full pr-4">
                        <Progress
                          value={progress}
                          className="[&>div]:bg-[#64f0ff] bg-zinc-700"
                        />
                      </div>
                    </div>
                    {progress == 100 ? (
                      <Button variant={"destructive"} onClick={cancelUpload}>
                        <X />
                      </Button>
                    ) : !uploadLoading ? (
                      <Button variant={"secondary"} onClick={handleUploadClick}>
                        <Upload />
                      </Button>
                    ) : (
                      <Button variant={"secondary"} disabled>
                        <Loader2 className="animate-spin" />
                      </Button>
                    )}
                  </div>
                ) : null}

                <div className=" justify-end flex mt-8">
                  <DialogClose>
                    <div className="mr-3">
                      <Button
                        className="hover:bg-neutral-700"
                        onClick={resetState}
                      >
                        Cancel
                      </Button>
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
