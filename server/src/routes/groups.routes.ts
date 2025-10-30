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
router.put("/:groupId", authMiddleware, updateGroupController);

// * Delete Group
router.delete("/:groupId", authMiddleware, deleteGroupContoller);

// * Add Tohdo to Group
// router.post("/");

export default router;
