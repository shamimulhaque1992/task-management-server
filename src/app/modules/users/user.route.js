import express from "express";
import { UserController } from "./user.controller.js";

const router = express.Router();

router.get("/:email", UserController.getSingleUser);
router.patch("/create-user", UserController.createUser);
router.post("/assign-task", UserController.assignTaskToUser);
router.patch("/update-task", UserController.updateTaskForUser);
router.patch("/preferences", UserController.updateUserPreferences);

export const UserRoutes = router;
