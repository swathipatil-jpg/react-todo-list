import { useState } from "react";
import useTasks from "../hooks/useTasks";
import { Button } from "./ui/button";

export default function AddTask() {
  const { addTask } = useTasks();
  const [text, setText] = useState("");
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
    addTask(text, null, time || null, alarm);
    setText("");
    setTime("");
    setAlarm(false);
    setStep(1);
  };

  const handleSkip = () => {
    addTask(text);
    setText("");
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
      <div className="flex items-center gap-3 mb-6 bg-slate-800/80 p-3 rounded-lg border border-slate-600">
        <span className="text-white text-sm font-medium">Set time & alarm?</span>
        <input
          type="time"
          step="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-slate-700 text-white border border-slate-600 rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
        />
        <label className="flex items-center gap-1 text-white text-sm cursor-pointer ml-2">
          <input
            type="checkbox"
            checked={alarm}
            onChange={(e) => setAlarm(e.target.checked)}
            className="accent-violet-500 w-4 h-4 cursor-pointer"
          />
          Alarm
        </label>
        <div className="flex-1"></div>
        <Button onClick={handleSkip} variant="ghost" className="text-slate-300 hover:text-white px-3 h-8 text-sm">
          Skip
        </Button>
        <Button onClick={handleSave} className="bg-violet-600 hover:bg-violet-700 text-white px-4 h-8 text-sm">
          Save
        </Button>
      </div>
    );
  }

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
        onClick={handleNext}
        className="bg-violet-600 hover:bg-violet-700 text-white px-6"
      >
        <span className="mr-1">➕</span> Add
      </Button>
    </div>
  );
}
