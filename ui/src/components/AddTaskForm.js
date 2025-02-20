import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URl } from "../util";

const AddTaskForm = ({ fetchTasks }) => {
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false); // Prevent multiple clicks

  const addNewTask = async () => {
    if (!newTask.trim()) return; // Prevent empty tasks
    setIsAdding(true);

    try {
      await axios.post(API_URl, {
        name: newTask.trim(),
        completed: false,
      });

      await fetchTasks();
      setNewTask(""); // Clear input after successful addition
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setIsAdding(false); // Re-enable button after request
    }
  };

  return (
    <div>
      <Typography align="center" variant="h4" paddingY={2}>
        My Task List
      </Typography>
      <div className="addTaskForm">
        <TextField
          size="small"
          label="Task"
          variant="outlined"
          value={newTask} // Bind input value
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          disabled={isAdding || !newTask.trim().length}
          variant="outlined"
          onClick={addNewTask}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};

export default AddTaskForm;
