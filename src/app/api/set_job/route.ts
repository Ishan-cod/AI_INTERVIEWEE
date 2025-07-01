import dbConnect from "@/utils/db_connect";
import { job_model } from "@/models/job.model";

interface job_detail {
  job_title: string;
  location: string;
  country: string;
  salary: number;
  skills_required: Array<string>;
  company_name: string;
  experience_required?: string;
  job_description: string;
}
export async function POST(request: Request) {
  await dbConnect();
  try {
    const body: job_detail = await request.json();
    if (!body) {
      return Response.json(
        {
          success: false,
          message: "BAD REQUEST",
        },
        { status: 400 }
      );
    }

    const new_job = await job_model.create({
      job_title: body.job_title,
      location: body.location,
      country: body.country,
      salary: body.salary,
      skills_required: body.skills_required,
      company_name: body.company_name,
      experience_required: body.experience_required,
      job_description: body.job_description,
    });

    const response_db = await new_job.save();
    if (!response_db) {
      return Response.json(
        {
          success: false,
          message: "New Job cannot be created",
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        data: response_db,
        message: "New Job created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error creating NEW JOB __CATCHED",
        error: error,
      },
      { status: 500 }
    );
  }
}
