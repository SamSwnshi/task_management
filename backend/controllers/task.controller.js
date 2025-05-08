import Task from "../models/task.models.js";

export const getTask = async (req, res) => {
  const { userId, status } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  const filter = { userId };

  if (status && status !== "All") {
    if (status === "Active") {
      filter.status = { $ne: "complete" };
    } else if (status === "Completed") {
      filter.status = "complete";
    }
  }

  try {
    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tasks,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  const { title, description, priority, status = "incomplete" } = req.body;
  console.log(req.body);
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }
  if (!priority) {
    return res.status(400).json({ message: "Priority is required" });
  }
  try {
    const task = new Task({
      title,
      description,
      priority,
      status,
      userId: req.user.id,
    });

    const savedTask = await task.save();
    res.status(201).json({
      success: true,
      data: savedTask,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }
    res.json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found",
      });
    }
    res.json({
      success: true,
      data: null,
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message,
    });
  }
};
