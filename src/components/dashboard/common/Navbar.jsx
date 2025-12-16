import { Bell, Search } from "lucide-react";
import ThemeToggle from "../../../utils/theme/Theme";

const Navbar = () => {
  return (
    <div
      className="
      inline-flex justify-between items-center w-full h-fit
      backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80
      border-b border-zinc-200 dark:border-zinc-800
      md:px-5 px-3 py-3 gap-4
      shadow-sm
    "
    >
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Search */}
      <div className="w-full flex items-center gap-2">
        <input
          type="text"
          placeholder="Search contests..."
          className="
            w-full px-4 py-2 rounded-lg
            bg-zinc-100 dark:bg-zinc-800
            text-zinc-800 dark:text-white
            placeholder:text-zinc-400
            focus:outline-none focus:ring-1 focus:ring-purple-500/60
            transition
          "
        />
        <div
          className="
            p-2 rounded-lg
            bg-gradient-to-br from-blue-500 to-purple-500
            hover:opacity-90 transition cursor-pointer
          "
        >
          <Search className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Notification */}
      <div
        className="
          p-2 rounded-full
          hover:bg-zinc-100 dark:hover:bg-zinc-800
          transition cursor-pointer
        "
      >
        <Bell className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
      </div>
    </div>
  );
};

export default Navbar;
