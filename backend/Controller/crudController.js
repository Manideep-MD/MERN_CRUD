import Task from "../Model/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const existingTask = await Task.findOne({ title, description });

    if (existingTask) {
      return res.status(400).json({ message: "Task with the same title and description already exists" });
    }

    const task = new Task({ title, description });
    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Fetch Tasks Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Fetch Task Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const deleteMultipleTasks = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const result = await Task.deleteMany({ title, description });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No matching tasks found to delete" });
    }

    res.status(200).json({ message: `${result.deletedCount} task(s) deleted successfully` });
  } catch (error) {
    console.error("Delete Tasks Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
