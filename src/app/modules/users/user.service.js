import { User } from "./user.model.js";
import { Task } from "../tasks/task.model.js";
import ApiError from "../../../errors/ApiError.js";
import httpStatus from "http-status";

// Get Single User

const getSingleUser = async (email) => {
  const user = await User.findOne({ email }).populate(
    "tasks",
    "title description status priority dueDate"
  );
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  return user;
};

// Create User
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    return error;
  }
};

// Function to assign a task to a user
const assignTaskToUser = async (userId, taskId) => {
  const user = await User.findById(userId);
  const task = await Task.findById(taskId);

  if (!user) throw new Error("User not found");
  if (!task) throw new Error("Task not found");

  // Assign task to user
  user.tasks.push(taskId);
  await user.save();

  return { user, task };
};

// Function to update task status/priority for a specific user
const updateUserTaskStatus = async (userId, taskId, { status, priority }) => {
  // Fetch the user by ID
  const user = await User.findById(userId).populate("tasks");

  if (!user) throw new Error("User not found");

  // Check if the task belongs to the user
  const task = user.tasks.find((task) => task._id.toString() === taskId);

  if (!task) throw new Error("Task not assigned to this user");

  // Update task status and/or priority
  if (status) task.status = status;
  if (priority) task.priority = priority;

  await task.save();

  return task;
};
// Update user preferences
const updateUserPreferences = async (userId, preferences) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  user.preferences = { ...user.preferences, ...preferences };
  await user.save();

  return user;
};

export const UserService = {
  getSingleUser,
  createUser,
  assignTaskToUser,
  updateUserTaskStatus,
  updateUserPreferences,
};
