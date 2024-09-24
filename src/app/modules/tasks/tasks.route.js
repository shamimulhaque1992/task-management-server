import express from 'express';
import { TaskController } from './task.controller.js';

const router = express.Router();

router.post('/create-task', TaskController.createTask);
router.get('/:id', TaskController.getSingleTask);
router.patch('/:id', TaskController.updateTask);
router.patch('/:taskId/update-status', TaskController.updateTaskStatus);
router.delete('/:id', TaskController.deleteTask);
router.get('/', TaskController.getAllTasks);

export const TaskRoutes = router;
