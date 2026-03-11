import AddTask from "../components/AddTask";
import TaskItem from "../components/TaskItem";
import useTasks from "../hooks/useTasks";
import { Card } from "../components/ui/card";

export default function Home() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  return (
    <div className="flex-1 p-10 min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
      <div
        className="absolute top-40 right-10 w-96 h-96 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute -bottom-8 left-1/4 w-96 h-96 bg-indigo-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative z-10">
        <AddTask />
        <div className="space-y-3 mt-5">
          {tasks.length === 0 ? (
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <p className="text-slate-500 text-lg">
                No tasks yet. Add one to get started! 🎯
              </p>
            </Card>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
