import React, { useState, useEffect } from "react";
import TaskListProps from "../interface/TaskListProps";
import classNames from "classnames";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';


const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onAddTask,
  onDeleteTask,
  onToggleComplete,
  filter,
}) => {
  const [newTaskText, setNewTaskText] = useState<string>("");

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Uncompleted") return !task.completed;
    return true;
  });

  return (
    <div>
      <div>

        <TextField
          id="outlined-basic"
          label="Add a new task"
          variant="outlined"
          color="info"
          size="small"
          value={newTaskText}
          sx={{m: 2}}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <Button sx={{m: 2}} variant="outlined" size="large" onClick={() => onAddTask(newTaskText)}>Add Task</Button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={classNames({ completed: task.completed })}
          >
            <span onClick={() => onToggleComplete(task.id)}>
              {" "}
              <FormControlLabel
                control={<Checkbox checked={task.completed} />}
                label={task.text}
              />
            </span>
            <Button color="error" onClick={() => onDeleteTask(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
