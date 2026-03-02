import { RequestHandler, Response, Request } from "express";
import { ResponseStatus } from "@/types/response";
import {
  createTohdoService,
  deleteTohdoService,
  getUserTohdosService,
  updateTohdoService,
} from "@/services/tohdo.service";
import { NewTohdo, UpdateTohdo } from "@/types/tohdo";
import { handleZodError } from "@/utils/handleZodError";
import { tohdoInsertSchema, tohdoUpdateSchema } from "@/db/schema";

export const getUserTohdosController: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = Number(req.user.sub);
    const groups = await getUserTohdosService(userId);
    res.json({
      status: ResponseStatus.Success,
      groups,
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
  try {
    const userId = Number(req.user.sub);
    const formValues: UpdateTohdo = req.body;
    const tohdoId = Number(req.params.tohdoId);
    const parsedValues: UpdateTohdo = tohdoUpdateSchema.parse(formValues);

    const data = { userId, tohdoId, ...parsedValues };
    const tohdo = await updateTohdoService(data);

    res.status(200).json({
      status: ResponseStatus.Success,
      message: `Updated tohdo !`,
      tohdo,
    });
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

// export const updateTohdoControllerPatch = async (req, res) => {
//   try {
//     const tohdoId = Number(req.params.tohdoId);
//     const userId = req.user.sub; // assume from auth middleware

//     const data = tohdoUpdateSchema.parse(req.body);

//     // remove undefined fields
//     const updates = Object.fromEntries(
//       Object.entries(data).filter(([_, v]) => v !== undefined),
//     );

//     if (Object.keys(updates).length === 0) {
//       return res.status(400).json({
//         status: "error",
//         message: "At least one field must be provided for update",
//       });
//     }

//     updates.updated_at = new Date();

//     const [updatedTohdo] = await db
//       .update(tohdos)
//       .set(updates)
//       .where(and(eq(tohdos.id, tohdoId), eq(tohdos.userId, userId)))
//       .returning();

//     if (!updatedTohdo)
//       return res
//         .status(404)
//         .json({ message: "Tohdo not found or unauthorized" });

//     res.json({ status: "success", data: updatedTohdo });
//   } catch (error) {
//     if (error.name === "ZodError") return handleZodError(error, res);
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };

export const deleteTohdoContoller: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = Number(req.user.sub);
    const tohdoId = Number(req.params.tohdoId);
    const deletedTohdo = await deleteTohdoService(tohdoId, userId);
    res.status(204).json({
      status: ResponseStatus.Success,
      message: `Deleted tohdo '${deletedTohdo.title}'!`,
      deletedGroup: deletedTohdo,
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
