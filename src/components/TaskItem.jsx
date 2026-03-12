import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import useTasks from "../hooks/useTasks";

export default function TaskItem({ task, toggleTask, deleteTask }) {
  const { editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDescription, setEditDescription] = useState(task.description || "");

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

  const handleSaveEdit = () => {
    if (editText.trim() && (editText !== task.text || editDescription !== task.description)) {
      editTask(task.id, editText, editDescription);
    } else {
      setEditText(task.text); // revert if empty
      setEditDescription(task.description || "");
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditText(task.text);
      setEditDescription(task.description || "");
      setIsEditing(false);
    }
  };

  return (
    <div className="group">
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 p-4 flex justify-between items-start hover:scale-[1.02] border border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-4 flex-1">
          <span
            onClick={() => !isEditing && toggleTask(task.id)}
            className={`mt-1 w-5 h-5 rounded-full border-2 ${isEditing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} flex items-center justify-center transition-all duration-200 shrink-0 ${task.done ? "bg-green-500 border-green-500" : "border-slate-400 dark:border-slate-500 hover:border-sky-500 dark:hover:border-sky-400"}`}
          >
            {task.done && <span className="text-white text-xs">✓</span>}
          </span>

          <div className="flex flex-col flex-1 gap-1">
            {isEditing ? (
              <div className="flex flex-col gap-2 w-full pr-4">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="w-full text-base bg-white dark:bg-slate-700 border border-violet-300 dark:border-violet-600 rounded px-2 py-1 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSaveEdit();
                    } else if (e.key === "Escape") {
                      setEditText(task.text);
                      setEditDescription(task.description || "");
                      setIsEditing(false);
                    }
                  }}
                  placeholder="Task description..."
                  className="w-full text-sm bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none h-16"
                />
                <div className="flex justify-end gap-2 mt-1">
                  <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => {
                    setEditText(task.text);
                    setEditDescription(task.description || "");
                    setIsEditing(false);
                  }}>Cancel</Button>
                  <Button size="sm" className="h-7 text-xs bg-violet-600 hover:bg-violet-700" onClick={handleSaveEdit}>Save</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <span
                  onClick={() => toggleTask(task.id)}
                  className={`text-base cursor-pointer transition-all duration-200 ${task.done ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-100 hover:text-slate-900 dark:hover:text-white"}`}
                >
                  {task.text}
                </span>
                {task.description && (
                  <p className={`text-sm mt-1 whitespace-pre-wrap ${task.done ? "text-slate-400 dark:text-slate-500" : "text-slate-600 dark:text-slate-400"}`}>
                    {task.description}
                  </p>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {task.date && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  📅 {new Date(task.date).toLocaleDateString()}
                </span>
              )}
              {task.time && (
                <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                  ⏰ {task.time}
                </span>
              )}
              {task.alarm && (
                <span className="text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded font-medium" title="Alarm set">
                  🔔 Alarm
                </span>
              )}
            </div>
          </div>

          {!isEditing && getPriorityBadge(task.priority)}
        </div>

        <div className="flex items-center ml-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
              className="text-slate-400 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 mr-1"
              title="Edit Task"
            >
              ✏️
            </Button>
          )}
          <Button
            onClick={() => deleteTask(task.id)}
            variant="ghost"
            size="sm"
            className="text-red-400 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Delete Task"
          >
            🗑️
          </Button>
        </div>
      </Card>
    </div>
  );
}
