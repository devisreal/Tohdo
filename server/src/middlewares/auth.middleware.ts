import "dotenv/config";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { ResponseStatus } from "@/types/response";
import { JwtPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET ?? "";

const authMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token: string | undefined = req.cookies?.access_token;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      status: ResponseStatus.Error,
      message: "Not authenticated",
    });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: ResponseStatus.Error,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
