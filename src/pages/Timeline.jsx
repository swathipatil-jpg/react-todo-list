import useTasks from "../hooks/useTasks";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

export default function Timeline() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.date && b.date) {
      return new Date(a.date) - new Date(b.date);
    }
    if (a.date) return -1;
    if (b.date) return 1;
    return b.id - a.id;
  });

  const pendingTasks = sortedTasks.filter((task) => !task.done);
  const completedTasks = sortedTasks.filter((task) => task.done);

  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="danger" className="text-xs">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="warning" className="text-xs">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="success" className="text-xs">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-10 min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span>📊</span> Timeline
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                Pending ({pendingTasks.length})
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {pendingTasks.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-8">
                    🎉 All tasks completed!
                  </p>
                ) : (
                  pendingTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-sky-50 p-3 rounded-lg hover:bg-sky-100 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-sm font-mono">
                          {index + 1}
                        </span>
                        <div className="flex flex-col">
                          <span
                            onClick={() => toggleTask(task.id)}
                            className="cursor-pointer text-slate-700 hover:text-slate-900 transition-colors"
                          >
                            {task.text}
                          </span>
                          {task.date && (
                            <span className="text-xs text-slate-500">
                              📅 {new Date(task.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(task.priority)}
                        <Button
                          onClick={() => deleteTask(task.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                Completed ({completedTasks.length})
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {completedTasks.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-8">
                    💪 No completed tasks yet
                  </p>
                ) : (
                  completedTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-slate-50 p-3 rounded-lg opacity-70 hover:opacity-80 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-sm font-mono">
                          {index + 1}
                        </span>
                        <div className="flex flex-col">
                          <span
                            onClick={() => toggleTask(task.id)}
                            className="cursor-pointer line-through text-slate-500 hover:text-slate-600"
                          >
                            {task.text}
                          </span>
                          {task.date && (
                            <span className="text-xs text-slate-400">
                              📅 {new Date(task.date).toLocaleDateString()}
                              {task.time && ` | ⏰ ${task.time}`}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => deleteTask(task.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        🗑️
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Progress Summary
            </h3>
            <div className="flex items-center gap-4">
              <Progress value={progressPercentage} className="flex-1 h-3" />
              <span className="text-slate-600 text-sm font-medium min-w-[80px] text-right">
                {completedCount}/{totalTasks} ({progressPercentage}%)
              </span>
            </div>
            <div className="flex justify-between mt-3 text-xs text-slate-500">
              <span>Pending: {pendingTasks.length}</span>
              <span>Completed: {completedTasks.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
