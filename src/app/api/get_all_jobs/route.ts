import { job_model } from "@/models/job.model";
import dbConnect from "@/utils/db_connect";

export async function GET() {
  await dbConnect();

  const all_jobs = await job_model.find();
  if (!all_jobs) {
    return Response.json(
      {
        success: false,
        message: "Jobs cannot be fetched",
      },
      { status: 502 }
    );
  }

  if (all_jobs.length == 0) {
    return Response.json(
      {
        success: true,
        message: "No jobs available",
      },
      { status: 200 }
    );
  }

  return Response.json(
    {
      success: true,
      message: "Jobs fetched successfully",
      data: { all_jobs },
    },
    { status: 200 }
  );
}
