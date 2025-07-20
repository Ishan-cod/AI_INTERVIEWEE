import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

function verifyToken(token: string) {
  if (typeof token !== "string") {
    return "";
  }
  const token_detail = jwt.verify(token, process.env.JWT_SECRET as string);

  return token_detail;
}

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
      token: tokenDetail,
    },
    { status: 200 }
  );
}
