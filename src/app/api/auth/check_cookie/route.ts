
import { cookies } from "next/headers";
import { verifyToken } from "../check_cookie";



export async function GET() {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return Response.json(
      {
        success: false,
        message: "Cannot fetch auth_token",
      },
      { status: 404 }
    );
  }

  const tokenDetail = verifyToken(token as string);
  //   console.log(tokenDetail);

  if (tokenDetail == "") {
    return Response.json(
      {
        success: false,
        message: "Cannot fetch Auth Token",
      },
      { status: 404 }
    );
  }

  return Response.json(
    {
      success: true,
      message: "Token fetched successfully",
      token: tokenDetail,
    },
    { status: 200 }
  );
}
