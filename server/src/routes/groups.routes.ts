import {
  createGroupController,
  deleteGroupContoller,
  getUserGroupsController,
  updateGroupController,
} from "@/controllers/groups.contoller";
import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";

const router: Router = Router();

// * Get User Groups
router.get("/", authMiddleware, getUserGroupsController);

// * Create New Group
router.post("/", authMiddleware, createGroupController);

// * Edit Group details
router.put("/", updateGroupController);

// * Delete Group
router.delete("/", deleteGroupContoller);

// * Add Tohdo to Group
// router.post("/");

export default router;
