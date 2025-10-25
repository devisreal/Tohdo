import { Request, RequestHandler, Response } from "express";
import "dotenv/config";
import { NewUser } from "@/types/user";
import * as authService from "@/services/auth.service";
import { ResponseStatus } from "@/types/response";
import { JwtPayload } from "@/types/auth";
import config from "@/config/config";
import jwt from "jsonwebtoken";

const isProd = config.nodeEnv === "production";
const JWT_SECRET = process.env.JWT_SECRET!;

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const formValues: NewUser = req.body;
    if (!formValues.username || !formValues.email || !formValues.password) {
      res.status(400).json({
        status: ResponseStatus.Error,
        message: "Email, Username and Password are required",
      });
    }

    const user = await authService.registerUserService(formValues);

    const payload: JwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      iss: "https://tohdo.herokuapp.com",
      aud: "https://tohdo.vercel.app",
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 60 * 1000,
    });

    res.status(201).json({
      status: ResponseStatus.Success,
      message: "User registered successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ status: ResponseStatus.Error, message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const loginController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  res.send("login user");
};
