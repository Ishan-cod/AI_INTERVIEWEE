import { PerformanceModel } from "@/models/performance.model";
import dbConnect from "@/utils/db_connect";

export async function GET() {
  await dbConnect();
  const allPer = await PerformanceModel.find();

  return Response.json(
    {
      res : allPer,
    },
    { status: 200 }
  );
}
