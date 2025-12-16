// ThemeToggle.jsx
import localforage from "localforage";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light"); // 'light' | 'dark'

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await localforage.getItem("theme");
      const finalTheme = savedTheme || "light";

      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(finalTheme);

      setTheme(finalTheme);
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);

    setTheme(newTheme);
    await localforage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
      className="
        relative flex items-center justify-center
        w-10 h-10 rounded-full
        bg-zinc-200 dark:bg-zinc-700
        hover:bg-zinc-300 dark:hover:bg-zinc-600
        transition-all duration-300 ease-in-out
        active:scale-95
      "
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="w-5 h-5 text-zinc-800 transition-transform duration-300 rotate-0" />
      )}
    </button>
  );
};

export default ThemeToggle;
