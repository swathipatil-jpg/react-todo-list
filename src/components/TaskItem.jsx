import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function TaskItem({ task, toggleTask, deleteTask }) {
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
    <div className="group">
      <Card className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 p-4 flex justify-between items-center hover:scale-[1.02] border border-slate-200">
        <div className="flex items-center gap-4 flex-1">
          <span
            onClick={() => toggleTask(task.id)}
            className={`w-5 h-5 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-200 ${task.done ? "bg-green-500 border-green-500" : "border-slate-400 hover:border-sky-500"}`}
          >
            {task.done && <span className="text-white text-xs">✓</span>}
          </span>

          <div className="flex flex-col flex-1">
            <span
              onClick={() => toggleTask(task.id)}
              className={`text-base cursor-pointer transition-all duration-200 ${task.done ? "line-through text-slate-400" : "text-slate-700 hover:text-slate-900"}`}
            >
              {task.text}
            </span>
            
            <div className="flex items-center gap-2 mt-1">
              {task.date && (
                <span className="text-xs text-slate-500">
                  📅 {new Date(task.date).toLocaleDateString()}
                </span>
              )}
              {task.time && (
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  ⏰ {task.time}
                </span>
              )}
              {task.alarm && (
                <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded font-medium" title="Alarm set">
                  🔔 Alarm
                </span>
              )}
            </div>
          </div>

          {getPriorityBadge(task.priority)}
        </div>

        <Button
          onClick={() => deleteTask(task.id)}
          variant="ghost"
          size="sm"
          className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          🗑️
        </Button>
      </Card>
    </div>
  );
}
