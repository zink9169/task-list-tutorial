import { Button, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateTaskForm } from "./UpdateTaskForm";
import axios from "axios";
import classnames from "classnames";
import { API_URl } from "../util";

export default function Task({ task, fetchTasks }) {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(`${API_URl}/${id}`, {
        name,
        completed: !isComplete,
      });

      setIsComplete((prev) => !prev);
      await fetchTasks(); // Ensure updated data from backend
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URl}/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="task">
      <div className={classnames({ done: isComplete }, "flex")}>
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
        <Typography variant="h6">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      />
    </div>
  );
}
