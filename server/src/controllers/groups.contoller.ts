import {
  createGroupService,
  getUserGroupsService,
} from "@/services/groups.service";
import { ResponseStatus } from "@/types/response";
import { NewTohdo } from "@/types/tohdo";
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
  try {
    const { name } = req.body;
    const data: NewTohdo = { userId: req.user.sub, title: name };

    const group = await createGroupService(data);
    res.status(201).json({
      status: ResponseStatus.Success,
      message: `Group '${group.groupName}' created successfully`,
      group,
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
