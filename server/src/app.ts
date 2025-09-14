import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { errorHandler } from "@/middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.get("/", async (_req: Request, res: Response) => {
  res.send("Hello ts starter");
});

app.use(errorHandler);

export default app;
