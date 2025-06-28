import { BaseMessage } from "@langchain/core/messages";
import { chat_bot } from "./chat_bot";

interface request_body {
  human_message: string;
  chat_history: BaseMessage[];
}
export async function POST(request: Request) {
  try {
    const body: request_body = await request.json();
    if (!body) {
      console.error("Unable to fetch the request, Please retry");
      return Response.json(
        {
          success: false,
          message: "Error fetching request params",
        },
        { status: 400 }
      );
    }

    const human_message: string = body.human_message;
    const chat_history: BaseMessage[] = body.chat_history;

    if (!human_message || !chat_history) {
      console.error("Unauthorized params passed");
      return Response.json(
        {
          success: false,
          message: "Invalid params",
        },
        { status: 400 }
      );
    }

    const response = await chat_bot(human_message, chat_history);

    if (!response) {
      console.error("Chat Bot response failed !");
      return Response.json(
        {
          success: false,
          message: "Chat Bot response ERROR",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Chat Bot responded successfully",
        response: response,
        chat_history: chat_history,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error connecting chat_bot");
    return Response.json(
      {
        success: false,
        message: "ERROR CONNECTING CHAT BOT",
        data: error,
      },
      { status: 500 }
    );
  }
}
