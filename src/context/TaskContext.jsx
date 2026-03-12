/* eslint-disable no-unused-vars, react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, date = null, time = null, alarm = false, description = "") => {
    const taskDate = date || new Date().toISOString().split("T")[0];
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), text, description, done: false, date: taskDate, time, alarm },
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const dismissAlarm = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, alarm: false } : task
      )
    );
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

  const editTask = (id, newText, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText, description: newDescription !== undefined ? newDescription : task.description } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask, dismissAlarm, getTasksByDate, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => useContext(TaskContext);
