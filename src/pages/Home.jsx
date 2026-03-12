import { useState } from "react";
import AddTask from "../components/AddTask";
import TaskItem from "../components/TaskItem";
import MiniCalendar from "../components/MiniCalendar";
import useTasks from "../hooks/useTasks";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Home() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  
  const filteredTasks = tasks.filter((task) => {
    // Check Status Filter First
    if (filter === "completed" && !task.done) return false;
    if (filter === "pending" && task.done) return false;

    // Check Date Filter Second
    if (dateFilter && task.date !== dateFilter) return false;

    return true; // If Both match, include task
  });

  return (
    <div className="flex-1 p-10 min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-200/50 dark:bg-sky-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
      <div
        className="absolute top-40 right-10 w-96 h-96 bg-sky-200/50 dark:bg-sky-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute -bottom-8 left-1/4 w-96 h-96 bg-indigo-200/50 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <AddTask selectedDate={dateFilter} />

          {/* FILTER BUTTONS */}
          <div className="flex items-center gap-2 mt-4 mb-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm inline-flex transition-colors duration-200">
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "ghost"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-violet-600 hover:bg-violet-700 text-white" : "text-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filter === "pending" ? "default" : "ghost"}
              onClick={() => setFilter("pending")}
              className={filter === "pending" ? "bg-violet-600 hover:bg-violet-700 text-white" : "text-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"}
            >
              Pending
            </Button>
            <Button
              size="sm"
              variant={filter === "completed" ? "default" : "ghost"}
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "bg-violet-600 hover:bg-violet-700 text-white" : "text-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"}
            >
              Completed
            </Button>
            
            {dateFilter && (
              <>
                <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-2"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/30 px-2 py-1 rounded">
                    {dateFilter}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDateFilter("")}
                    className="h-7 w-7 p-0 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  >
                    ✕
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <Card className="p-8 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-lg mt-4 transition-colors duration-200">
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  No tasks found for this filter.
                </p>
              </Card>
            ) : (
              filteredTasks.map((task) => (
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

        {/* Calendar Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-10">
            <MiniCalendar selectedDate={dateFilter} onSelectDate={setDateFilter} />
          </div>
        </div>
      </div>
    </div>
  );
}