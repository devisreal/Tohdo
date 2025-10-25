import { Request, RequestHandler, Response } from "express";
import "dotenv/config";
import { NewUser } from "@/types/user";
import * as authService from "@/services/auth.service";

export enum ResponseStatus {
  Success = "success",
  Fail = "fail",
  Error = "error",
}

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
