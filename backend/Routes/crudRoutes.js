import express from "express";
import {
  deleteTask,
  fetchTask,
  createTask,
  fetchTasks,
  updateTask,
  deleteMultipleTasks,
} from "../Controller/crudController.js";
import protect from "../Utils/protect.js";

const route = express.Router();

route.post("/tasks", protect, createTask);

route.get("/tasks", protect, fetchTasks);

route.put("/tasks/:id", protect, updateTask);

route.delete("/tasks/:id", protect, deleteTask);

route.get("/tasks/:id", protect, fetchTask);

route.delete("/tasks", protect, deleteMultipleTasks);


// route.post("/search", protect, Search);

export default route;
