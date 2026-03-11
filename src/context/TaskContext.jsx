import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTask = (text, date = null) => {
    setTasks([...tasks, { id: Date.now(), text, done: false, date }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getTasksByDate = (date) => {
    if (!date) return tasks;
    return tasks.filter((task) => {
      if (!task.date) return false;
      const taskDate = new Date(task.date).toDateString();
      const targetDate = new Date(date).toDateString();
      return taskDate === targetDate;
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask, getTasksByDate }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => useContext(TaskContext);
