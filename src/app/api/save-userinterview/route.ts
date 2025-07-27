import { cookies } from "next/headers";
// import { verifyToken } from "../auth/check_cookie/route";
import { UserModel } from "@/models/user.model";
import mongoose from "mongoose";
import { verifyToken } from "../auth/check_cookie";

type requestType = {
  Interview_id: mongoose.Types.ObjectId;
};

export async function POST(request: Request) {
  try {
    const body: requestType = await request.json();

    if (!body || !body.Interview_id) {
      return Response.json(
        {
          success: false,
          message: "Interview Id not provided",
        },
        { status: 400 }
      );
    }

    const auth_token = (await cookies()).get("auth_token")?.value;
    if (auth_token == undefined) {
      return Response.json(
        {
          success: false,
          message: "Cannot found auth token",
        },
        { status: 401, statusText: "Unauthorized access" }
      );
    }
    const token_detail: any = verifyToken(auth_token);

    const existing_user = await UserModel.findOne({
      email: token_detail.email,
    });

    if (!existing_user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const alreadyGiven = existing_user?.interview_given?.some((id) =>
      id.equals(body.Interview_id as any)
    );

    if (alreadyGiven) {
      return Response.json(
        {
          success: false,
          message: "Interview already exists",
        },
        { status: 409 } // 409 Conflict is more appropriate than 403
      );
    }

    existing_user?.interview_given.push(body.Interview_id);
    await existing_user.save();

    return Response.json(
      {
        success: true,
        message: "Interview details saved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving interview details:", error);
    return Response.json(
      {
        success: false,
        message: "Cannot save interview details to user",
      },
      { status: 500 }
    );
  }
}
