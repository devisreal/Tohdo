import { Request, RequestHandler, Response } from "express";
import "dotenv/config";
import { NewUser } from "@/types/user";
import * as authService from "@/services/auth.service";
import { ResponseStatus } from "@/types/response";
import { LoginPayload } from "@/types/auth";
import config from "@/config/config";

const isProd = config.nodeEnv === "production";

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

    const { user, token } = await authService.registerUserService(formValues);

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
      user: { id: user.id, email: user.email, token },
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
  try {
    const formValues: LoginPayload = req.body;
    if (!formValues.email || !formValues.password) {
      res.status(400).json({ message: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      res
        .status(400)
        .json({ status: ResponseStatus.Error, message: "Invalid email" });
    }

    const token = await authService.loginUserService(formValues);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 60 * 1000,
    });

    res.json({
      status: ResponseStatus.Success,
      message: "Login successful",
      token,
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
