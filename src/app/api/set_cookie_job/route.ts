import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { job_id } = body;

  console.log(job_id);

  if (!job_id) {
    // redirect('/')
    return Response.json(
      {
        success: false,
        message: "ID NOT FOUND",
      },
      { status: 400, statusText: "JOB ID NOT FOUND" }
    );
  }

  (await cookies()).set({
    name: "jobId",
    value: job_id,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    maxAge: 24 * 60 * 60,
  });

  return Response.json(
    {
      success: true,
      message: "JOB COOKIE SET SUCCESSFULLY",
    },
    { status: 200 }
  );
}
