import { UserModel } from "@/models/user.model";
import dbConnect from "@/utils/db_connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface signupbody {
  name: string;
  email: string;
  password: string;
}

function generatetoken(username: string, email: string, password: string) {
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

  const body: signupbody = await request.json();
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return Response.json(
      {
        success: false,
        message: "Request missing content",
      },
      { status: 400 }
    );
  }

  const existingUser = await UserModel.findOne({ email: email });

  if (existingUser) {
    return Response.json(
      {
        success: false,
        message: "User already exist please try login",
      },
      { status: 409 }
    );
  }

  const encrypted_password = await bcrypt.hash(password, 10);
  const token = generatetoken(name, email, encrypted_password);
  if (!token) {
    return Response.json(
      {
        success: false,
        message: "Error generating authentication token",
      },
      { status: 500 }
    );
  }

  const NewUsr = await UserModel.create({
    email: email,
    password: encrypted_password,
    name: name,
    refresh_token: token,
    refresh_token_expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  if (!NewUsr) {
    return Response.json(
      {
        success: false,
        message: "Error creating user profile",
      },
      { status: 500 }
    );
  } else {
    (await cookies()).set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
  }

  return Response.json(
    {
      success: true,
      message: "New user created successfully",
    },
    { status: 201 }
  );
}
