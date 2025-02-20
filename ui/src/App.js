import AddTaskForm from "./components/AddTaskForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Task from "./components/Task";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URl } from "./util";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks from:", API_URl); // Log the URL
      const { data } = await axios.get(API_URl);
      console.log("Fetched tasks:", data); // Log the response data
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.length === 0 ? (
        <div>No tasks available</div> // Display a message if no tasks exist
      ) : (
        tasks.map((task) => (
          <Task task={task} key={task.id} fetchTasks={fetchTasks} />
        ))
      )}
    </ThemeProvider>
  );
}

export default App;
