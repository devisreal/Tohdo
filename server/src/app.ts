import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { errorHandler } from "@/middlewares/errorHandler";
import { db } from "./db";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.get("/", async (_req: Request, res: Response) => {
  const result = await db.execute('select 1');
  res.send(result);
});

app.use(errorHandler);

export default app;
