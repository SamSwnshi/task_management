
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["incomplete", "complete"],
      default: "incomplete",
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: "medium",
    },
    createdAt: { type: Date, default: Date.now },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task",taskSchema);

export default Task;