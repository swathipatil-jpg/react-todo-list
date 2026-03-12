import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <div className="w-full bg-gradient-to-r from-sky-500 to-navy-blue-300 dark:from-slate-800 dark:to-slate-900 text-white p-4 shadow-md flex justify-between items-center relative transition-colors duration-200">
      <h1 className="text-xl font-bold flex-1 text-center flex items-center justify-center gap-2">
        <span>🏠</span> To Do List
      </h1>
      <div className="absolute right-4 flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
}
