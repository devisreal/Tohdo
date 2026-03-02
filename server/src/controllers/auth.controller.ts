import { CookieOptions, RequestHandler, Response } from "express";
import "dotenv/config";
import { NewUser } from "@/types/user";
import * as authService from "@/services/auth.service";
import { ResponseStatus } from "@/types/response";
import { LoginPayload } from "@/types/auth";
import config from "@/config/config";

const isProd = config.nodeEnv === "production";
const ACCESS_TOKEN_COOKIE_KEY = "access_token";

// These options are reused when setting and clearing the auth cookie.
// Keeping them centralized avoids subtle bugs where logout fails because cookie
// attributes do not match the original cookie configuration.
const accessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
  maxAge: 30 * 60 * 1000,
};

// A small helper keeps cookie-writing logic consistent across register/login flows.
const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie(ACCESS_TOKEN_COOKIE_KEY, token, accessTokenCookieOptions);
};

export const registerController: RequestHandler = async (req, res) => {
  try {
    const formValues: NewUser = req.body;
    if (!formValues.username || !formValues.email || !formValues.password) {
      res.status(400).json({
        status: ResponseStatus.Error,
        message: "Email, Username and Password are required",
      });
      return;
    }

    const { user, token } = await authService.registerUserService(formValues);

    setAccessTokenCookie(res, token);

    res.status(201).json({
      status: ResponseStatus.Success,
      message: "User registered successfully",
      user: { id: user.id, email: user.email },
    });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ status: ResponseStatus.Error, message: error.message });
      return;
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
      return;
    }
  }
};

export const loginController: RequestHandler = async (req, res) => {
  try {
    const formValues: LoginPayload = req.body;
    if (!formValues.email || !formValues.password) {
      res.status(400).json({
        status: ResponseStatus.Error,
        message: "Email and password are required",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.email)) {
      res
        .status(400)
        .json({ status: ResponseStatus.Error, message: "Invalid email" });
      return;
    }

    const { user, token } = await authService.loginUserService(formValues);

    setAccessTokenCookie(res, token);

    res.json({
      status: ResponseStatus.Success,
      message: "Login successful",
      user: { id: user.id, email: user.email },
    });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ status: ResponseStatus.Error, message: error.message });
      return;
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
      return;
    }
  }
};

export const validateController: RequestHandler = (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401).json({
      status: ResponseStatus.Error,
      isValid: false,
      message: "Not authenticated",
    });
    return;
  }

  res.json({
    status: ResponseStatus.Success,
    isValid: true,
    user: {
      id: user.sub,
      email: user.email,
    },
  });
  return;
};

export const logoutController: RequestHandler = (_req, res) => {
  // Clear the same cookie key/attributes used during login/register.
  // Matching attributes is important so browsers actually remove the cookie.
  res.clearCookie(ACCESS_TOKEN_COOKIE_KEY, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });

  res.json({
    status: ResponseStatus.Success,
    message: "Logout successful",
  });
  return;
};
