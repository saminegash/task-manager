import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Task from "./interface/Task";
import FilterMenu from "./components/FilterMenu";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [_, setNewTaskText] = useState<string>("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks && storedTasks.length) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = (text: string) => {
    if (text.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setFilter("All");
    setNewTaskText("");
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <div>
        <span>
          {" "}
          <h2>Task Manager</h2>
        </span>
        {tasks.length === 0 ? (
          ""
        ) : (
          <>
            <FilterMenu setFilter={setFilter} /> <span>{filter}</span>
          </>
        )}
      </div>

      <TaskList
        tasks={tasks}
        onAddTask={addTask}
        onDeleteTask={deleteTask}
        onToggleComplete={toggleComplete}
        filter={filter}
      />
    </div>
  );
};

export default App;
