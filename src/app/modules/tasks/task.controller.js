import catchAsync from "../../../shared/catchAsync.js";
import { TaskService } from "./task.service.js";
import httpStatus from "http-status";

// Create a new task
const createTask = catchAsync(async (req, res) => {
  const taskData = req.body;
  const result = await TaskService.createTask(taskData);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Task created successfully!",
    data: result,
  });
});

// Get all tasks
const getAllTasks = catchAsync(async (req, res) => {
  const { priority, status, sortBy, sortOrder, userId } = req.query;
  console.log("userId", userId);
  // Call the service function with query parameters
  const result = await TaskService.getAllTasks({
    priority,
    status,
    sortBy,
    sortOrder,
    userId,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Tasks retrieved successfully!",
    data: result,
  });
});

// Get a single task by ID
const getSingleTask = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await TaskService.getSingleTask(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Task retrieved successfully!",
    data: result,
  });
});

// Update task by ID
const updateTask = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await TaskService.updateTask(id, updatedData);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Task updated successfully!",
    data: result,
  });
});

// Updating task status and priority of an user
const updateTaskStatus = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { status, priority } = req.body;

  const result = await TaskService.updateTaskStatus(taskId, {
    status,
    priority,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Task status/priority updated successfully!",
    data: result,
  });
});

// Delete a task by ID
const deleteTask = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await TaskService.deleteTask(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Task deleted successfully!",
    data: result,
  });
});

export const TaskController = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
