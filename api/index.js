import express from "express";
import { fetchTasks, createTasks, updateTasks, deleteTasks } from "./task";
import serverless from "serverless-http";
import cors from "cors";
import express from "express";
const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();

    res.send(tasks.Items);
  } catch (err) {
    res.status(400).send(`Error fetch tasks: ${err}`);
  }
});

app.post("/task", async (req, res) => {
  try {
    const tasks = req.body;

    const response = await createTasks(task);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating tasks: ${error}`);
  }
});

app.put("/task", async (req, res) => {
  try {
    const tasks = req.body;

    const response = await updateTasks(task);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating tasks: ${error}`);
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deleteTasks(id);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error deleting tasks: ${error}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
