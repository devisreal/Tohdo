import { Router } from "express";
import authMiddleware from "@/middlewares/auth.middleware";
import {
  createTohdoController,
  deleteTohdoContoller,
  getUserTohdosController,
  updateTohdoController,
} from "@/controllers/tohdo.controller";
const router: Router = Router();

// * Get User Tohdos
router.get("/", authMiddleware, getUserTohdosController);

// * Create New Tohdo
router.post("/", authMiddleware, createTohdoController);

// * Edit Tohdo details
router.put("/:tohdoId", authMiddleware, updateTohdoController);

// * Delete Tohdo
router.delete("/:tohdoId", authMiddleware, deleteTohdoContoller);

export default router;
