import { RequestHandler, Response, Request } from "express";
import { ResponseStatus } from "@/types/response";
import {
  createTohdoService,
  getUserTohdosService,
} from "@/services/tohdo.service";
import { NewTohdo, tohdoInsertSchema } from "@/types/tohdo";
import { handleZodError } from "@/utils/handleZodError";

export const getUserTohdosController: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user.sub;
    const data = await getUserTohdosService(userId);
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

export const createTohdoController: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = Number(req.user.sub);
    const formValues: NewTohdo = { userId, ...req.body };
    const parsedValues = tohdoInsertSchema.parse(formValues);
    const group = await createTohdoService(parsedValues);
    res.status(201).json({
      status: ResponseStatus.Success,
      message: "Tohdo created successfully",
      group,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "ZodError") {
        return handleZodError(error, res);
      }

      res.status(400).json({
        status: ResponseStatus.Error,
        message: error.message,
      });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateTohdoController: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  //   try {
  //     const user: JwtPayload = req.user;
  //     const data: { name: string } = req.body;
  //     const groupId = Number(req.params.groupId);
  //     const group = await updateGroupService(Number(user.sub), groupId, data);
  //     res.status(200).json({
  //       status: ResponseStatus.Success,
  //       message: `Updated group name to '${group.groupName}'!`,
  //       group,
  //     });
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       res
  //         .status(400)
  //         .json({ status: ResponseStatus.Error, message: error.message });
  //     } else {
  //       res.status(400).json({ message: "An unknown error occurred" });
  //     }
  //   }
};

export const deleteTohdoContoller: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  //   try {
  //     const user: JwtPayload = req.user;
  //     const groupId = Number(req.params.groupId);
  //     const deletedGroup = await deleteGroupService(groupId, Number(user.sub));
  //     res.status(204).json({
  //       status: ResponseStatus.Success,
  //       message: `Deleted group '${deletedGroup.groupName}'!`,
  //       deletedGroup,
  //     });
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       res
  //         .status(400)
  //         .json({ status: ResponseStatus.Error, message: error.message, error });
  //     } else {
  //       res.status(400).json({ message: "An unknown error occurred" });
  //     }
  //   }
};
