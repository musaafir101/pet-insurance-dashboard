"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);

    if (savedMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white"); // Ensures body styles update
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white"); // Removes dark mode styles
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  };

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <header className="bg-blue-500 dark:bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Pet Insurance Dashboard</h1>
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded transition-all"
        >
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
