import { groupInsertSchema } from "@/db/schema";
import {
  createGroupService,
  deleteGroupService,
  getUserGroupsService,
  updateGroupService,
} from "@/services/groups.service";
import { JwtPayload } from "@/types/auth";
import { NewTohdoGroup } from "@/types/groups";
import { ResponseStatus } from "@/types/response";
import { handleZodError } from "@/utils/handleZodError";
import { Request, RequestHandler, Response } from "express";

export const getUserGroupsController: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
): Promise<void> => {
  try {
    const userId = Number(req.user.sub);
    const { name } = req.body;
    const data: NewTohdoGroup = { userId, groupName: name };
    const parsedValues = groupInsertSchema.parse(data);
    const group = await createGroupService(data);
    res.status(201).json({
      status: ResponseStatus.Success,
      message: `Group '${group.groupName}' created successfully`,
      group,
    });
    res.json(parsedValues);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "ZodError") {
        return handleZodError(error, res);
      }

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
): Promise<void> => {
  try {
    const user: JwtPayload = req.user;
    const data: { name: string } = req.body;
    const groupId = Number(req.params.groupId);

    const group = await updateGroupService(Number(user.sub), groupId, data);

    res.status(200).json({
      status: ResponseStatus.Success,
      message: `Updated group name to '${group.groupName}'!`,
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

export const deleteGroupContoller: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user: JwtPayload = req.user;
    const groupId = Number(req.params.groupId);

    const deletedGroup = await deleteGroupService(groupId, Number(user.sub));

    res.status(204).json({
      status: ResponseStatus.Success,
      message: `Deleted group '${deletedGroup.groupName}'!`,
      deletedGroup,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ status: ResponseStatus.Error, message: error.message, error });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
