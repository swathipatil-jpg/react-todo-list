import { useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function AlarmSystem() {
  const { tasks, dismissAlarm } = useTasks();
  const [activeAlarms, setActiveAlarms] = useState([]);
  const [permission, setPermission] = useState(Notification.permission);

  // Request notification permission and start the timer
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((perm) => setPermission(perm));
    }

    const checkAlarms = () => {
      const now = new Date();
      
      tasks.forEach((task) => {
        if (!task.done && task.alarm && task.date && task.time) {
          // Parse task date and time
          const [year, month, day] = task.date.split("-").map(Number);
          const [hours, minutes, seconds] = task.time.split(":").map(Number);
          
          const taskObj = new Date(year, month - 1, day, hours, minutes, seconds || 0);

          // If the task time has arrived or passed (within the last minute to avoid old alarms)
          const timeDiff = now - taskObj;
          if (timeDiff >= 0 && timeDiff < 60000) {
            triggerAlarm(task);
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [tasks]);

  const triggerAlarm = (task) => {
    // 1. Trigger system notification
    if (permission === "granted") {
      new Notification("Task Alarm: " + task.text, {
        body: "Your task time is now!",
        icon: "/vite.svg" // We can use the default icon or point to a clock icon
      });
    }

    // 2. Trigger in-app 3D visual alarm
    setActiveAlarms((prev) => {
      if (!prev.find(a => a.id === task.id)) {
        return [...prev, task];
      }
      return prev;
    });

    // We do NOT dismiss it automatically, the user must click "Dismiss"
  };

  const handleDismiss = (id) => {
    dismissAlarm(id);
    setActiveAlarms((prev) => prev.filter(t => t.id !== id));
  };

  if (activeAlarms.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-20 pointer-events-none gap-4">
      {activeAlarms.map((task) => (
        <div key={task.id} className="pointer-events-auto animate-bounce">
          <Card style={{
              transform: "perspective(1000px) rotateX(10deg) rotateY(-5deg)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 -10px 15px -3px rgba(255, 255, 255, 0.5) inset",
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
              border: "1px solid rgba(255, 255, 255, 0.4)"
            }} 
            className="w-96 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="bg-sky-500 text-white flex justify-center py-4 relative overflow-hidden">
               {/* 3D background elements */}
               <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
               <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-sky-400/50 rounded-full blur-xl"></div>
               <span className="text-6xl drop-shadow-lg z-10 animate-pulse">⏰</span>
            </div>
            
            <CardContent className="p-6 text-center">
              <h3 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-2 font-mono drop-shadow-sm">
                Your Task Time Is Now
              </h3>
              <p className="text-2xl font-bold text-slate-800 mb-4 truncate shadow-sm">
                {task.text}
              </p>
              
              <div className="bg-slate-100/80 rounded-lg p-3 inline-block mb-6 shadow-inner border border-slate-200">
                <span className="text-lg font-mono text-slate-600 font-semibold tracking-wider">
                  {task.time}
                </span>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => handleDismiss(task.id)}
                  className="bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/30 text-white font-medium px-8 w-full transition-transform active:scale-95"
                >
                  Dismiss Alarm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
