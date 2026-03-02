import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
  validateController,
} from "@/controllers/auth.controller";
import authMiddleware from "@/middlewares/auth.middleware";

const router: Router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/validate", authMiddleware, validateController);

router.post("/logout", logoutController);

export default router;
