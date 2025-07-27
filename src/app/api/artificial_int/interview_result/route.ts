import { InterviewResultGeneration } from "./chatsummarizer";

type msg_object = {
  sender: "ai" | "human";
  content: string;
};
type requestType = {
  transcript: Array<msg_object>;
};

export async function POST(request: Request) {
  try {
    const body: requestType = await request.json();
    if (!body) {
      return Response.json(
        {
          success: false,
          message: "Request transcript not fetched",
        },
        { status: 400 }
      );
    }

    const response = await InterviewResultGeneration(body.transcript);

    if (response == null) {
      return Response.json(
        {
          success: false,
          message: "AI RESPONSE ERROR",
        },
        { status: 500 }
      );
    }

    console.log(response)
    return Response.json(
      {
        success: true,
        message: "RESULT FETCHED SUCCESSFULLY",
        result: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Cannot fetch result",
      },
      { status: 500, statusText: "INTERVIEW RESULT NOT GENERATED" }
    );
  }
}
