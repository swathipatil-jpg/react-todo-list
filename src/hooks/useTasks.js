import { useTaskContext } from "../context/TaskContext";

export default function useTasks() {
  const { tasks, addTask, toggleTask, deleteTask, getTasksByDate } =
    useTaskContext();
  return { tasks, addTask, toggleTask, deleteTask, getTasksByDate };
}
