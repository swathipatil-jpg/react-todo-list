import { useState } from "react";
import useTasks from "../hooks/useTasks";
import { Button } from "./ui/button";

export default function AddTask() {
  const { addTask } = useTasks();
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;

    addTask(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <input
        className="border border-slate-600 bg-slate-800/80 text-white placeholder-slate-400 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        onClick={handleAdd}
        className="bg-violet-600 hover:bg-violet-700 text-white px-6"
      >
        <span className="mr-1">➕</span> Add
      </Button>
    </div>
  );
}
