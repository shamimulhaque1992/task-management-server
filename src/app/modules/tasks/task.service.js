import ApiError from "../../../errors/ApiError.js";
import { Task } from "./task.model.js";
import httpStatus from "http-status";

// Create a new task
const createTask = async (payload) => {
  const result = await Task.create(payload);
  return result;
};

// Get all tasks for a particular user with filtering and sorting
const getAllTasks = async ({ userId, priority, status, sortBy, sortOrder }) => {
  // Create a filter object to store the query conditions
  const filter = {
    assignedTo: userId,
  }; // Filter by userId to get tasks for this user

  // Add filtering conditions based on query parameters
  if (priority) {
    filter.priority = priority; // e.g., 'Low', 'Medium', 'High'
  }
  if (status) {
    filter.status = status; // e.g., 'Pending', 'In Progress', 'Completed'
  }

  // Define sorting order (default is descending for priority and due date)
  const sortCriteria = {};

  // Custom sorting for priority
  if (sortBy === "priority") {
    // Map 'High' > 'Medium' > 'Low' to numerical values
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    // If ascending order, sort by mapped values; otherwise reverse it
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    // To sort by priority based on custom order, use aggregation
    const tasks = await Task.aggregate([
      { $match: filter },
      {
        $addFields: {
          priorityOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$priority", "High"] }, then: 1 },
                { case: { $eq: ["$priority", "Medium"] }, then: 2 },
                { case: { $eq: ["$priority", "Low"] }, then: 3 },
              ],
              default: 4, // Use default for any undefined priority (just in case)
            },
          },
        },
      },
      { $sort: { priorityOrder: sortDirection } },
    ]);

    return tasks;
  }

  // Default sorting for other fields (like dueDate or status)
  if (sortBy) {
    sortCriteria[sortBy] = sortOrder === "asc" ? 1 : -1; // Sort by the specified field
  } else {
    // Default sorting by due date in descending order if no sortBy is provided
    sortCriteria.dueDate = -1;
  }

  // Retrieve tasks based on the filter and sort criteria
  const tasks = await Task.find(filter).sort(sortCriteria);
  return tasks;
};

// Get a single task by ID
const getSingleTask = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return task;
};

// Update a task by ID
const updateTask = async (id, payload) => {
  const updatedTask = await Task.findByIdAndUpdate(id, payload, { new: true });
  if (!updatedTask) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return updatedTask;
};

// Update task status of an user

const updateTaskStatus = async (taskId, { status, priority }) => {
  const task = await Task.findById(taskId);
  if (!task) throw new Error("Task not found");

  if (status) task.status = status;
  if (priority) task.priority = priority;

  await task.save();

  return task;
};

// Delete a task by ID
const deleteTask = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  if (!deletedTask) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return deletedTask;
};

export const TaskService = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
