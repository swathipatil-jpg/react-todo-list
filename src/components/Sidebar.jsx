export default function Sidebar({
  currentPage = "home",
  setCurrentPage = () => {},
}) {
  const menuItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "timeline", label: "Timeline", icon: "📊" },
    { id: "history", label: "History"},
    { id: "time", label:"Time"}
  ];

  return (
    <div className="w-60 bg-white dark:bg-slate-800 shadow-lg h-full p-6 border-r border-slate-200 dark:border-slate-700 transition-colors duration-200 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-6 text-slate-700 dark:text-slate-200">Menu</h2>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`cursor-pointer px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              currentPage === item.id
                ? "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-slate-700/50 hover:text-sky-600 dark:hover:text-sky-300"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
