export default function Sidebar({
  currentPage = "home",
  setCurrentPage = () => {},
}) {
  const menuItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "timeline", label: "Timeline", icon: "📊" },
  ];

  return (
    <div className="w-60 bg-white shadow-lg h-screen p-6 border-r border-slate-200">
      <h2 className="text-lg font-semibold mb-6 text-slate-700">Menu</h2>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`cursor-pointer px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              currentPage === item.id
                ? "bg-sky-100 text-sky-700 font-medium"
                : "text-slate-600 hover:bg-sky-50 hover:text-sky-600"
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
