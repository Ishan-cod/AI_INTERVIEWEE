import { interview_model } from "@/models/interview.model";
import { job_model } from "@/models/job.model";
import { PerformanceModel } from "@/models/performance.model";
import { UserModel } from "@/models/user.model";

type body = {
  userID: string;
};

type recentInterview = {
  jobID: string;
  job_title: string;
  company: string;
  appliedDate: Date;
  resultID: string;
  score: number;
  hire_status: boolean;
  feedback: string;
};

export async function POST(request: Request) {
  try {
    const body: body = await request.json();
    if (!body) {
      return Response.json(
        {
          success: false,
          message: "Bad Request params",
        },
        { status: 400 }
      );
    }

    const userID: string = body.userID.trim();

    const req_user = await UserModel.findById(userID);
    if (!req_user) {
      return Response.json(
        {
          success: false,
          message: "Invalid User",
        },
        { status: 401 }
      );
    }

    const candid_name = req_user.name;
    const candid_email = req_user.email;

    const interviewsID_array = req_user.interview_given;
    if (!interviewsID_array) {
      return Response.json(
        {
          success: false,
          message: "Cannot fetch interview array from User",
        },
        { status: 500 }
      );
    }

    let recent_applied_interviews: Array<recentInterview> = [];

    await Promise.all(
      interviewsID_array.reverse().map(async (IobjID) => {
        const interviewfetched: any = await interview_model.findById(IobjID);

        if (!interviewfetched) {
          return Response.json(
            {
              success: false,
              message: "Error fetching interview details",
            },
            { status: 500 }
          );
        }

        const result_id = interviewfetched.performance;
        const date_applied = interviewfetched.createdAt;
        const jobapplied_id = interviewfetched.job_applied;
        const jobapplied_details = await job_model.findById(jobapplied_id);

        //   console.log(jobapplied_details)

        if (!jobapplied_details) {
          return Response.json(
            {
              success: false,
              message: "Cannot fetch the job details for the interview",
            },
            { status: 500 }
          );
        }

        const job_title = jobapplied_details.job_title;
        const company = jobapplied_details.company_name;

        const performance = await PerformanceModel.findById(result_id);

        if (!performance) {
          return Response.json(
            {
              success: false,
              message: "Cannot fetch performance detail for interviews given",
            },
            { status: 500 }
          );
        }

        recent_applied_interviews.push({
          jobID: jobapplied_id,
          job_title: job_title,
          company: company,
          resultID: result_id,
          appliedDate: date_applied,
          score: performance.overall_score,
          hire_status: performance.hireable,
          feedback: performance.concluding_statement,
        });

        console.log(recent_applied_interviews);
      })
    );

    return Response.json(
      {
        success: true,
        message: "Dashboard details fetched successfully",
        data: {
          candidate_name: candid_name,
          candidate_email: candid_email,
          interview_applied: recent_applied_interviews,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error fetching dashboard",
      },
      { status: 500 }
    );
  }
}
