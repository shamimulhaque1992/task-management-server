import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "light",
      },
      notifications: { type: Boolean, default: true },
      defaultSortBy: {
        type: String,
        enum: ["dueDate", "priority"],
        default: "priority",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
