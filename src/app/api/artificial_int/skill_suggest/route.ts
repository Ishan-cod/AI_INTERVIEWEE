import SkillsResponse from "./Skill_Respose";

export async function POST(request: Request) {
  const body = await request.json();
  const { job_role } = body;

  if (!job_role) {
    return Response.json(
      {
        success: false,
        message: "Job role not provided",
      },
      { status: 400 }
    );
  }

  try {
    const res = await SkillsResponse(job_role);

    return Response.json(
      {
        success: true,
        Skillset: res,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Cannot fetch Skill set",
        error
      },
      { status: 500 }
    );
  }
}
