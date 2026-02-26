import { Router } from "express";
import {
  registerController,
  loginController,
} from "@/controllers/auth.controller";
import authMiddleware from "@/middlewares/auth.middleware";

const router: Router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/validate", authMiddleware, async (_req, res) => {
  res.json({ isValid: true });
});

export default router;
