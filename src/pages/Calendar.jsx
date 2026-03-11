import { useState } from "react";
import useTasks from "../hooks/useTasks";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Calendar() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getTasksForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((task) => task.date === dateStr);
  };

  const handleDateClick = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(selectedDate === dateStr ? null : dateStr);
  };

  const selectedDateTasks = selectedDate
    ? tasks.filter((task) => task.date === selectedDate)
    : [];

  return (
    <div className="flex-1 p-10 min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-100">
      <div className="absolute top-20 left-10 w-96 h-96 bg-sky-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />

      <div className="relative z-10 flex gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg flex-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                onClick={prevMonth}
                variant="outline"
                size="sm"
                className="hover:bg-sky-50"
              >
                ←
              </Button>
              <h2 className="text-xl font-bold text-slate-800">
                {monthNames[month]} {year}
              </h2>
              <Button
                onClick={nextMonth}
                variant="outline"
                size="sm"
                className="hover:bg-sky-50"
              >
                →
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-slate-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-20" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayTasks = getTasksForDate(day);
                const isSelected = selectedDate === dateStr;
                const hasTasks = dayTasks.length > 0;

                return (
                  <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`h-20 p-2 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                      isSelected
                        ? "border-sky-500 bg-sky-100"
                        : hasTasks
                          ? "border-sky-200 bg-sky-50 hover:bg-sky-100"
                          : "border-transparent hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-sm font-medium text-slate-700">
                      {day}
                    </div>
                    {hasTasks && (
                      <div className="mt-1">
                        <div className="text-xs text-slate-500">
                          {dayTasks.length} task{dayTasks.length > 1 ? "s" : ""}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {selectedDate && (
          <Card className="w-80 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                📅{" "}
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedDateTasks.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-4">
                    No tasks for this date
                  </p>
                ) : (
                  selectedDateTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-sky-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span
                          onClick={() => toggleTask(task.id)}
                          className={`w-4 h-4 rounded-full border-2 cursor-pointer flex items-center justify-center ${
                            task.done
                              ? "bg-green-500 border-green-500"
                              : "border-slate-400"
                          }`}
                        >
                          {task.done && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </span>
                        <span
                          className={
                            task.done
                              ? "line-through text-slate-400 text-sm"
                              : "text-slate-700 text-sm"
                          }
                        >
                          {task.text}
                        </span>
                      </div>
                      <Button
                        onClick={() => deleteTask(task.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        🗑️
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
