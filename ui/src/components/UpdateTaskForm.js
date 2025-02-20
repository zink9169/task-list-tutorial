import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URl } from "../util";

export const UpdateTaskForm = ({
  isDialogOpen,
  setIsDialogOpen,
  task,
  fetchTasks,
}) => {
  const { id, name, completed } = task;
  const [taskName, setTaskName] = useState(name);

  useEffect(() => {
    setTaskName(name); // Update state when task changes
  }, [name]);

  const handleUpdateTaskName = async () => {
    try {
      await axios.put(`${API_URl}/${id}`, {
        name: taskName,
        completed,
      });

      await fetchTasks();
      setIsDialogOpen(false); // Close dialog after update
    } catch (err) {
      console.error(`Error updating task: ${err}`);
    }
  };

  return (
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <DialogTitle>Edit Task</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Task Name"
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button variant="contained" onClick={handleUpdateTaskName}>
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};
