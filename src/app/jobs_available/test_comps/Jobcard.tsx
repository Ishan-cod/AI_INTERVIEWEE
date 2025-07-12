import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Divider } from "@heroui/react";
import React, { lazy } from "react";
import { Roboto_Mono, Inter, Roboto } from "next/font/google";
import Interview_dialog from "./UploadResumeDialog";
import { useRouter } from "next/navigation";

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

// TODO: Fetch from DB
function Jobcard() {
  return (
    <div>
      <Card className="bg-[#09090B] text-white w-[300px] border-0 origin-top-left transition-transform duration-300 scale-[var(--scale)] rounded-[26px]">
        <CardHeader>
          <CardTitle className="text-[17px]">
            <div className={`${roboto_mono.className}`}>Frontend Developer</div>
          </CardTitle>

          <Divider className="opacity-55" />
        </CardHeader>
        <CardContent>
          <div className={`${roboto.className} text-white/70 text-[16px]`}>
            <div>Location : Banglore, India</div>
            <div>Salary : Rs. 18,00,000</div>
            <div>Time : 1 yr</div>
            <div>Experience : 2-2.5 yr</div>
          </div>
        </CardContent>
        <CardFooter>
          <div className=" w-[367px] flex justify-end">
            <Button className="bg-[#2A2626] hover:scale-110">
              <div className={`${inter.className}`}>View Details</div>
            </Button>
            <Interview_dialog />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Jobcard;
