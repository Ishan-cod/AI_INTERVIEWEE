import dbConnect from "@/utils/db_connect";
import { cookies } from "next/headers";
// import { verifyToken } from "../auth/check_cookie/route";
import { UserModel } from "@/models/user.model";
import mongoose from "mongoose";
import { interview_interface, interview_model } from "@/models/interview.model";
import { job_model } from "@/models/job.model";
import { verifyToken } from "../auth/check_cookie";

export async function GET() {
  await dbConnect();
  try {
    const auth_token = (await cookies()).get("auth_token")?.value;
    const tokendetail: any = verifyToken(auth_token as string);
    if (!tokendetail || tokendetail === "") {
      return Response.json({
        success: false,
        message: "User details not found",
      });
    }

    const existingUser: any = await UserModel.find({
      email: tokendetail.email,
    });
    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: "User donot exist",
        },
        { status: 404 }
      );
    }

    const interviewID: Array<mongoose.Types.ObjectId | interview_interface> =
      existingUser.interview_given;

    if (interviewID.length == 0) {
      return Response.json(
        {
          success: false,
          message: "No interview given",
        },
        { status: 402, statusText: "NO INTERVIEW" }
      );
    }

    let appliedJobs: Array<{
      jobtitle: string;
      performanceID: mongoose.Types.ObjectId;
    }> = [];

    interviewID.map(async (id) => {
      const InterviewDetails: any = await interview_model.findById(id);
      const JOBID = InterviewDetails.job_applied;
      const PerformanceID = InterviewDetails.performance;
      const jobdetails: any = await job_model.findById(JOBID);
      appliedJobs.push({
        jobtitle: jobdetails.job_title,
        performanceID: PerformanceID,
      });
    });

    return Response.json(
      {
        success: true,
        message: "JOB TITLE FOUND",
        interview_given: appliedJobs,
      },
      { status: 200 }
    );
  } catch (e) {}
}
