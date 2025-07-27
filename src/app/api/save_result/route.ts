import { PerformanceModel } from "@/models/performance.model";
import dbConnect from "@/utils/db_connect";

type question_feed = {
  question: string;
  feedback: string;
  topic: string;
  score: number;
};
type strength = {
  topic: string;
  detail: string;
};
type result = {
  overall_score: number;
  hireable: boolean;
  question_feedback: question_feed[];
  strengths: strength[];
  action_items: string[];
  concluding_statement: string;
};
interface requestbody {
  result: result;
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body: requestbody = await request.json();
    // TODO:
    // console.log(body);
    if (!body) {
      return Response.json(
        {
          success: false,
          message: "INVALID REQUEST PARAMS",
        },
        { status: 400 }
      );
    }

    const newPerformance = await PerformanceModel.create({
      overall_score: body.result.overall_score,
      hireable: body.result.hireable,
      strengths: body.result.strengths,
      action_items: body.result.action_items,
      concluding_statement: body.result.concluding_statement,
      question_feedback: body.result.question_feedback,
    });

    if (!newPerformance) {
      return Response.json(
        {
          success: false,
          message: "Cannot save perrformance",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Performance saved successfully",
        result_id: newPerformance._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return Response.json(
      {
        success: false,
        message: "ERROR CREATING PERFORMANCE",
        error: error,
      },
      { status: 501 }
    );
  }
}
