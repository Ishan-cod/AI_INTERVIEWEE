import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Divider } from "@heroui/react";
import React from "react";
import { Roboto_Mono, Inter, Roboto } from "next/font/google";
import Interview_dialog from "./UploadResumeDialog";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto_mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface jobcard {
  job_id: string;
  job_title: string;
  location: string;
  country: string;
  salary: number;
  skills_required: Array<string>;
  company_name: string;
  experience_required?: string;
  job_description: string;
}

// TODO: Fetch from DB
function Jobcard(props: jobcard) {
  return (
    <div className="mt-2 m-2">
      <Card className="bg-[#09090B] text-white w-[300px] border-0 origin-top-left transition-transform duration-300 scale-[var(--scale)] rounded-[26px]">
        <CardHeader>
          <CardTitle className="text-[17px]">
            <div className={`${roboto_mono.className}`}>{props.job_title}</div>
          </CardTitle>

          <Divider className="opacity-55" />
        </CardHeader>
        <CardContent>
          <div className={`${roboto.className} text-white/70 text-[16px]`}>
            <div>
              Location : {props.location}, {props.country}
            </div>
            <div>Salary : Rs. {props.salary}</div>
            <div>Experience : {props.experience_required || "Freshers"} yr</div>
          </div>
        </CardContent>
        <CardFooter>
          <div className=" w-[367px] flex justify-end">
            <Button className="bg-[#2A2626] hover:scale-110">
              <div className={`${inter.className}`}>View Details</div>
            </Button>
            <Interview_dialog
              job_role={props.job_title}
              company={props.company_name}
              job_id={props.job_id}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Jobcard;
