import { useState } from "react";
import useTasks from "../hooks/useTasks";
import { Button } from "./ui/button";

export default function AddTask({ selectedDate }) {
  const { addTask } = useTasks();
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState(1);
  const [time, setTime] = useState("");
  const [alarm, setAlarm] = useState(false);

  
  const handleNext = () => {
    if (!text.trim()) return;
    const now = new Date();
    const currentTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setTime(currentTimeStr);
    setAlarm(true);
    setStep(2);
  };

  const handleSave = () => {
    addTask(text, selectedDate || null, time || null, alarm, description);
    setText("");
    setDescription("");
    setTime("");
    setAlarm(false);
    setStep(1);
  };

  const handleSkip = () => {
    addTask(text, selectedDate || null, null, false, description);
    setText("");
    setDescription("");
    setTime("");
    setAlarm(false);
    setStep(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (step === 1) handleNext();
      else handleSave();
    }
  };

  if (step === 2) {
    return (
      <div className="flex items-center gap-3 mb-6 bg-white dark:bg-slate-800/80 p-3 rounded-lg border border-slate-300 dark:border-slate-600 shadow-sm">
        <span className="text-slate-800 dark:text-white text-sm font-medium">Set time & alarm?</span>
        <input
          type="time"
          step="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
        />
        <label className="flex items-center gap-1 text-slate-700 dark:text-white text-sm cursor-pointer ml-2">
          <input
            type="checkbox"
            checked={alarm}
            onChange={(e) => setAlarm(e.target.checked)}
            className="accent-violet-500 w-4 h-4 cursor-pointer"
          />
          Alarm
        </label>
        <div className="flex-1"></div>
        <Button onClick={handleSkip} variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 h-8 text-sm">
          Skip
        </Button>
        <Button onClick={handleSave} className="bg-violet-600 hover:bg-violet-700 text-white px-4 h-8 text-sm">
          Save
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-6 bg-white dark:bg-slate-800/80 p-4 rounded-lg border border-slate-300 dark:border-slate-600 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-violet-500 focus-within:border-transparent">
      <input
        className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-lg font-medium focus:outline-none mb-2"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <textarea
        className="w-full bg-transparent text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none resize-none h-12 min-h-[48px] max-h-32"
        placeholder="Add a description (optional)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleNext();
          }
        }}
      />
      <div className="flex justify-end mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
        <Button
          onClick={handleNext}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 h-9"
        >
          <span className="mr-1">➕</span> Add Task
        </Button>
      </div>
    </div>
  );
}
