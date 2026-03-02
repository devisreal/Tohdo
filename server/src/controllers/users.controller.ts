import { RequestHandler } from "express";
import { ResponseStatus } from "@/types/response";
import {
  getUserProfileService,
  updateUserProfileService,
} from "@/services/users.service";

export const getMyProfileController: RequestHandler = async (req, res) => {
  try {
    // Read authenticated user id from JWT payload injected by auth middleware.
    const userId = Number(req.user?.sub);

    if (!userId) {
      res.status(401).json({
        status: ResponseStatus.Error,
        message: "Not authenticated",
      });
      return;
    }

    const user = await getUserProfileService(userId);

    // Return profile payload consumed by profile/edit profile pages.
    res.json({
      status: ResponseStatus.Success,
      user,
    });
    return;
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

export const updateMyProfileController: RequestHandler = async (req, res) => {
  try {
    // Read authenticated user id from JWT payload injected by auth middleware.
    const userId = Number(req.user.sub);

    if (!userId) {
      res.status(401).json({
        status: ResponseStatus.Error,
        message: "Not authenticated",
      });
      return;
    }

    // Accept only the fields exposed by the edit profile form.
    const { firstname, lastname, username, email } = req.body as {
      firstname?: string;
      lastname?: string;
      username?: string;
      email?: string;
    };

    // Validate required fields to avoid partial/invalid updates.
    if (!firstname || !lastname || !username || !email) {
      res.status(400).json({
        status: ResponseStatus.Error,
        message: "Firstname, lastname, username and email are required",
      });
      return;
    }

    // Keep backend email validation consistent with auth controller style.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        status: ResponseStatus.Error,
        message: "Invalid email",
      });
      return;
    }

    // Persist the profile update and return normalized profile payload.
    const updatedUser = await updateUserProfileService(userId, {
      firstname,
      lastname,
      username,
      email,
    });

    res.status(200).json({
      status: ResponseStatus.Success,
      message: "Profile updated successfully",
      user: updatedUser,
    });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        status: ResponseStatus.Error,
        message: error.message,
      });
      return;
    }

    res.status(400).json({
      status: ResponseStatus.Error,
      message: "An unknown error occurred",
    });
  }
};
