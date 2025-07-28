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
    if (!auth_token) {
      return Response.json(
        { success: false, message: "Token not found" },
        { status: 401 }
      );
    }

    const tokendetail: any = verifyToken(auth_token);
    if (!tokendetail?.email) {
      return Response.json({
        success: false,
        message: "User details not found",
      });
    }

    const existingUser: any = await UserModel.findOne({
      email: tokendetail.email,
    });
    if (!existingUser) {
      return Response.json(
        { success: false, message: "User does not exist" },
        { status: 404 }
      );
    }

    const interviewIDs: mongoose.Types.ObjectId[] =
      existingUser.interview_given;
    if (!interviewIDs || interviewIDs.length === 0) {
      return Response.json(
        { success: false, message: "No interview given" },
        { status: 402, statusText: "NO INTERVIEW" }
      );
    }

    const appliedJobs = await Promise.all(
      interviewIDs.map(async (id) => {
        const InterviewDetails: any = await interview_model.findById(id);
        if (!InterviewDetails) return null;

        const jobdetails: any = await job_model.findById(
          InterviewDetails.job_applied
        );
        if (!jobdetails) return null;

        return {
          jobtitle: jobdetails.job_title,
          performanceID: InterviewDetails.performance,
        };
      })
    );

    const validAppliedJobs = appliedJobs.filter((j) => j !== null);

    return Response.json(
      {
        success: true,
        message: "JOB TITLE FOUND",
        interview_given: validAppliedJobs,
      },
      { status: 200 }
    );
  } catch (e) {
    return Response.json(
      {
        success: false,
        message: "Some error occurred",
        error: e,
      },
      { status: 500 }
    );
  }
}
