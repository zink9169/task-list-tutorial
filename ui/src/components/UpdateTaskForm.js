import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { API_URl } from "../util";
export const UpdateTaskForm = ({
  isDialogOpen,
  setIsDialogOpen,
  task,
  fetchTasks,
}) => {
  const { id, completed } = task;
  const [taskName, setTaskName] = useState("");
  const handleUpdateTaskName = async () => {
    try {
      await axios.put(API_URl, {
        id,
        name: taskName,
        completed,
      });

      await fetchTasks();

      setTaskName("");
    } catch (err) {
      console.log(`error updating ${err}`);
    }
  };
  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Task</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label={taskName}
          variant="outlined"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdateTaskName();

            setIsDialogOpen(false);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};
