import express from "express";
import { TaskRoutes } from "../modules/tasks/tasks.route.js";
import { UserRoutes } from "../modules/users/user.route.js";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/task",
    route: TaskRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
