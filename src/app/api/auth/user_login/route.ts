import { UserModel } from "@/models/user.model";
import dbConnect from "@/utils/db_connect";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface loginBody {
  email: string;
  password: string;
}

function generatetoken(
  username: string,
  email: string,
  password: string
): string {
  const token = jwt.sign(
    {
      username: username,
      email: email,
      password: password,
    },
    process.env.JWT_SECRET as string
  );

  return token;
}

export async function POST(request: Request) {
  await dbConnect();
  const body: loginBody = await request.json();
  const { email, password } = body;

  if (!body) {
    return Response.json(
      {
        success: false,
        message: "Bad Request",
      },
      { status: 400 }
    );
  }

  const existingUser = await UserModel.findOne({
    email: email,
  });

  if (!existingUser) {
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return Response.json(
      {
        success: false,
        message: "Incorrect credentials",
      },
      { status: 400 }
    );
  }

  const token: string = generatetoken(
    existingUser.name,
    existingUser.email,
    existingUser.password
  );
  
  (await cookies()).set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return Response.json(
    {
      success: true,
      message: "User authentication successful",
    },
    { status: 200 }
  );
}
