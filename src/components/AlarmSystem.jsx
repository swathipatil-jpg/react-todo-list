import { useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function AlarmSystem() {

  const { tasks, dismissAlarm } = useTasks();

  const [activeAlarms, setActiveAlarms] = useState([]);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {

    if (Notification.permission === "default") {
      Notification.requestPermission().then(setPermission);
    }

    const checkAlarms = () => {

      const now = new Date();

      tasks.forEach((task) => {

        if (!task.done && task.alarm && task.date && task.time) {

          const [year, month, day] = task.date.split("-").map(Number);
          const [hours, minutes, seconds] = task.time.split(":").map(Number);

          const taskObj = new Date(
            year,
            month - 1,
            day,
            hours,
            minutes,
            seconds || 0
          );

          const timeDiff = now - taskObj;

          if (timeDiff >= 0 && timeDiff < 60000) {
            triggerAlarm(task);
          }

        }

      });

    };

    const interval = setInterval(checkAlarms, 5000);

    return () => clearInterval(interval);

  }, [tasks]);



  const triggerAlarm = (task) => {

    if (permission === "granted") {

      new Notification("Task Alarm: " + task.text, {
        body: "Your task time is now!",
        icon: "/vite.svg"
      });

    }

    setActiveAlarms((prev) => {

      if (!prev.find((a) => a.id === task.id)) {
        return [...prev, task];
      }

      return prev;

    });

  };


  const handleDismiss = (id) => {

    dismissAlarm(id);

    setActiveAlarms((prev) =>
      prev.filter((t) => t.id !== id)
    );

  };


  if (activeAlarms.length === 0) return null;



  return (

    <div className="fixed top-6 right-6 z-50 flex flex-col gap-4">

      {activeAlarms.map((task) => (

        <Card
          key={task.id}
          className="w-80 shadow-xl border bg-white dark:bg-slate-800 animate-slide-in-right"
        >

          <CardContent className="p-4 flex items-center gap-3">

            <div className="text-3xl animate-pulse">
              ⏰
            </div>

            <div className="flex-1">

              <p className="font-semibold text-slate-800 dark:text-white">
                Alarm Ringing
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300">
                {task.text}
              </p>

              <p className="text-xs text-slate-400">
                {task.time}
              </p>

            </div>

            <Button
              size="sm"
              onClick={() => handleDismiss(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Dismiss
            </Button>

          </CardContent>

        </Card>

      ))}

    </div>

  );
}