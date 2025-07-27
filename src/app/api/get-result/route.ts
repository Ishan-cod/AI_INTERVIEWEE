import { PerformanceModel } from "@/models/performance.model";
import dbConnect from "@/utils/db_connect";

type resultbody = {
  rid: string;
};
export async function POST(request: Request) {
  await dbConnect();
  const body: resultbody = await request.json();
  if (!body) {
    return Response.json(
      {
        success: false,
        message: "Result ID not found",
      },
      { status: 404 }
    );
  }

  const result = await PerformanceModel.findById(body.rid);
  if (!result) {
    return Response.json(
      {
        success: false,
        message: "Cannot fetch result",
      },
      { status: 500 }
    );
  }

  return Response.json(
    {
      success: true,
      message: "Result data fetched successfully",
      result,
    },
    { status: 200 }
  );
}
