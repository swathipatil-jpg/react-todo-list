import { useState } from "react";
import useTasks from "../hooks/useTasks";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function MiniCalendar({ selectedDate, onSelectDate }) {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onSelectDate(selectedDate === dateStr ? "" : dateStr);
  };

  const getDayClass = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayTasks = tasks.filter((t) => t.date === dateStr);
    const isSelected = selectedDate === dateStr;
    const hasTasks = dayTasks.length > 0;

    let baseClass = "h-8 w-8 flex items-center justify-center rounded-full text-xs font-medium cursor-pointer transition-all mx-auto ";

    if (isSelected) {
      baseClass += "bg-violet-600 dark:bg-violet-500 text-white shadow-md";
    } else if (hasTasks) {
      baseClass += "bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/50";
    } else {
      baseClass += "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700";
    }

    return baseClass;
  };

  return (
    <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-sm w-full max-w-sm mb-6 transition-colors duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={prevMonth} variant="ghost" size="sm" className="h-7 w-7 p-0 text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
            ←
          </Button>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {monthNames[month]} {year}
          </h3>
          <Button onClick={nextMonth} variant="ghost" size="sm" className="h-7 w-7 p-0 text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
            →
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={`${day}-${i}`} className="text-center text-[10px] font-medium text-slate-400 dark:text-slate-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8 w-8" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayTasks = tasks.filter((t) => t.date === dateStr);
            const hasTasks = dayTasks.length > 0;

            return (
              <div key={day} className="relative text-center">
                <div onClick={() => handleDateClick(day)} className={getDayClass(day)}>
                  {day}
                </div>
                {hasTasks && selectedDate !== dateStr && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-violet-400 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
