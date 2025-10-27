import { getUserGroupsService } from "@/services/groups.service";
import { ResponseStatus } from "@/types/response";
import { Request, RequestHandler, Response } from "express";

export const getUserGroupsController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.user.sub;
    const data = await getUserGroupsService(userId);
    res.json({
      status: ResponseStatus.Success,
      groups: data,
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

export const createGroupController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  res.send("Create Group");
};

export const updateGroupController: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  res.send("Edit Group");
};

export const deleteGroupContoller: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  res.send("Delete Group");
};
