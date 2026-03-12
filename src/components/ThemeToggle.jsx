import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {

  const { theme, setTheme } = useTheme();

  return (
    <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-1 w-fit">

      {/* Light */}
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-md transition-colors ${
          theme === "light"
            ? "bg-white dark:bg-slate-700 shadow-sm text-yellow-500"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        <Sun size={18} />
      </button>

      {/* System */}
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-md transition-colors ${
          theme === "system"
            ? "bg-white dark:bg-slate-700 shadow-sm text-sky-500"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        <Monitor size={18} />
      </button>

      {/* Dark */}
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-md transition-colors ${
          theme === "dark"
            ? "bg-white dark:bg-slate-700 shadow-sm text-violet-500"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        <Moon size={18} />
      </button>

    </div>
  );
}