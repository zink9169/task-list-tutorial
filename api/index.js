import serverless from "serverless-http";
import cors from "cors";
import express from "express";
import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Apply CORS globally
app.use(express.json());

// Sample GET endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Fetch all tasks
app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res
      .status(500)
      .json({ error: "Error fetching tasks", details: err.message });
  }
});

// Create a new task
app.post("/task", async (req, res) => {
  try {
    const { name, completed } = req.body;
    if (!name || completed === undefined) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name and completed" });
    }

    const response = await createTasks({ name, completed });
    res.status(201).json(response);
  } catch (err) {
    console.error("Error creating task with name:", req.body.name, err);
    res
      .status(500)
      .json({ error: "Error creating task", details: err.message });
  }
});

// Update an existing task
app.put("/task", async (req, res) => {
  try {
    const { id, name, completed } = req.body;
    if (!id || !name || completed === undefined) {
      return res
        .status(400)
        .json({ error: "Missing required fields: id, name, and completed" });
    }

    const response = await updateTasks({ id, name, completed });
    res.json(response);
  } catch (err) {
    console.error("Error updating task with id:", req.body.id, err);
    res
      .status(500)
      .json({ error: "Error updating task", details: err.message });
  }
});

// Delete a task by ID
app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing task ID" });
    }

    const response = await deleteTasks(id);
    if (!response.success) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(response);
  } catch (err) {
    console.error("Error deleting task with id:", req.params.id, err);
    res
      .status(500)
      .json({ error: "Error deleting task", details: err.message });
  }
});

// Local server (for development purposes)
if (process.env.NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Lambda export (for serverless deployment)
export const handler = serverless(app);
