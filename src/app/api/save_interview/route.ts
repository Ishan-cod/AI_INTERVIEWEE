import { interview_model } from "@/models/interview.model";
import dbConnect from "@/utils/db_connect";
import mongoose from "mongoose";
import { cookies } from "next/headers";

type requestbody = {
  Performance_ID: string;
};

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body: requestbody = await request.json();
    if (!body) {
      return Response.json(
        {
          success: false,
          message: "Performance ID not recieved",
        },
        { status: 400 }
      );
    }
    const job_id = (await cookies()).get("jobId")?.value;
    if (!job_id) {
      return Response.json(
        {
          success: false,
          message: "Unable to fetch Job ID",
        },
        { status: 404 }
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(job_id) ||
      !mongoose.Types.ObjectId.isValid(body.Performance_ID)
    ) {
      return Response.json(
        {
          success: false,
          message: "INVALID ID PROVIDED",
        },
        { status: 400 }
      );
    }

    const existing_interview = await interview_model.findOne({
      job_applied: job_id,
      performance: body.Performance_ID,
    });

    if (existing_interview) {
      return Response.json(
        {
          success: true,
          message: "INTERVIEW ALREADY EXIST",
          interview_id: existing_interview._id,
        },
        { status: 200, statusText: "Interview already exist" }
      );
    }

    const newInterview = await interview_model.create({
      job_applied: job_id,
      performance: body.Performance_ID,
    });

    if (!newInterview) {
      return Response.json(
        {
          success: false,
          message: "Unable to save interview",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Interview details saved successfully",
        interview_id: newInterview._id,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: " Error saving interview details",
      },
      { status: 500 }
    );
  }
}
