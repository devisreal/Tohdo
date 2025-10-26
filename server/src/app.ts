import express, { Request, Response, Express } from "express";
import cors from "cors";
import "dotenv/config";
import { errorHandler } from "@/middlewares/errorHandler";
import authRoutes from "@/routes/auth.routes";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.get("/", async (_req: Request, res: Response) => {
  res.send("Welcome Tohdo");
});

// * routes
app.use("/auth", authRoutes);

// * middleware

app.use(errorHandler);

export default app;
