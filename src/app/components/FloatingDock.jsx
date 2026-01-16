import { HiHome, HiUser, HiCodeBracket, HiEnvelope } from "react-icons/hi2";

const dockItems = [
  { id: 0, label: "Home", icon: HiHome },
  { id: 1, label: "About", icon: HiUser },
  { id: 2, label: "Projects", icon: HiCodeBracket },
  { id: 3, label: "Contact", icon: HiEnvelope },
];

export default function FloatingDock({ activeSection, onNavigate }) {
  return (
    <div className="flex gap-4 bg-black/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
      {dockItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`p-3 rounded-xl transition-all duration-300 ${
            activeSection === item.id
              ? "bg-emerald-500 text-white scale-110 shadow-lg"
              : "text-gray-400 hover:text-emerald-500 hover:bg-white/10"
          }`}
        >
          <item.icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
}
