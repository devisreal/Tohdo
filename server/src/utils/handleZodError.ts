import { ResponseStatus } from "@/types/response";
import { Response } from "express";

export const handleZodError = (error: Error, res: Response) => {
  try {
    const parsedErrors = JSON.parse(error.message);
    const formattedErrors = parsedErrors.map((err: any) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    res.status(400).json({
      status: ResponseStatus.Error,
      errors: formattedErrors,
    });
  } catch {
    res.status(400).json({
      status: ResponseStatus.Error,
      errors: [{ field: "unknown", message: "Invalid input data." }],
    });
  }
};
