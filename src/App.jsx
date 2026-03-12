import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Timeline from "./pages/Timeline";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import AlarmSystem from "./components/AlarmSystem";
import  History from "./components/History";
import Time from "./components/Time";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <ThemeProvider>
      <TaskProvider>
        <AlarmSystem />
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
          <Header />

        <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        <div className="flex-1 overflow-y-auto w-full h-full p-6">
          {currentPage === "home" && <Home />}
          {currentPage === "calendar" && <Calendar />}
          {currentPage === "timeline" && <Timeline />}
          {currentPage === "history" && <History/>}
          {currentPage === "time" && <Time/>}
        </div>
      </div>
      </div>
      </TaskProvider>
    </ThemeProvider>
  );
}
