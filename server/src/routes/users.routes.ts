import {
  getMyProfileController,
  updateMyProfileController,
} from "@/controllers/users.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";

const router: Router = Router();

// Returns the authenticated user's profile data.
router.get("/me", authMiddleware, getMyProfileController);

// Updates the authenticated user's profile data.
router.put("/me", authMiddleware, updateMyProfileController);

export default router;
