import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Timeline from "./pages/Timeline";
import { TaskProvider } from "./context/TaskContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <TaskProvider>
      <Header />

      <div className="flex">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {currentPage === "home" && <Home />}
        {currentPage === "calendar" && <Calendar />}
        {currentPage === "timeline" && <Timeline />}
      </div>
    </TaskProvider>
  );
}
