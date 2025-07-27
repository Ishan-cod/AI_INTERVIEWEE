import jwt from "jsonwebtoken";
export function verifyToken(token: string) {
  if (typeof token !== "string") {
    return "";
  }
  const token_detail = jwt.verify(token, process.env.JWT_SECRET as string);

  return token_detail;
}
