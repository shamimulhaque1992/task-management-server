import mongoose, { Schema, model } from "mongoose";
import ApiError from "../../../errors/ApiError";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: {
      virtuals: true,
    },
  }
);

// Pre-save hook to ensure a task with the same title doesn't exist for the same user
taskSchema.pre("save", async function (next) {
  if (this.isNew) {
    const existingTask = await mongoose.models.Task.findOne({
      title: this.title,
      assignedTo: this.assignedTo,
    });
    if (existingTask) {
      throw new ApiError(
        400,
        "Task with the same title already exists for this user!"
      );
    }
  }
  next();
});

export const Task = model("Task", taskSchema);
