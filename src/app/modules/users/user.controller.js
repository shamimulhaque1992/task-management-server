import { UserService } from "./user.service.js";
import catchAsync from "../../../shared/catchAsync.js";
import httpStatus from "http-status";

// Get Single User

// Get a single task by ID
const getSingleUser = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await UserService.getSingleUser(email);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User retrieved successfully!",
    data: result,
  });
});

// Create User
const createUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const result = await UserService.createUser({ name, email });
  let response = {};
  if (result?.errorResponse) {
    response = {
      success: false,
      message: result.errorResponse.errmsg,
      data: result,
    };
  } else {
    response = {
      success: true,
      message: "User created successfully!",
      data: result,
    };
  }
  res.status(httpStatus.CREATED).json(response);
});

// Assign task to user
const assignTaskToUser = async (req, res) => {
  const { userId, taskId } = req.body;
  const result = await UserService.assignTaskToUser(userId, taskId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Task assigned successfully!",
    data: result,
  });
};
// Update task status and priority for a user
const updateTaskForUser = async (req, res) => {
  const { userId, taskId, status, priority } = req.body;
  const result = await UserService.updateUserTaskStatus(userId, taskId, {
    status,
    priority,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Task status updated successfully!",
    data: result,
  });
};
// Update user preferences
const updateUserPreferences = catchAsync(async (req, res) => {
  const { userId } = req.body;
  const preferences = req.body.preferences;
  const result = await UserService.updateUserPreferences(userId, preferences);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Preferences updated successfully!",
    data: result,
  });
});

export const UserController = {
  getSingleUser,
  createUser,
  assignTaskToUser,
  updateTaskForUser,
  updateUserPreferences,
};
