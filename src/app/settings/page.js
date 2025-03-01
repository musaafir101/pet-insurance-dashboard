"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  useEffect(() => {
    // Check authentication using sessionStorage
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }

    // Load dark mode preference
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);

    // Apply dark mode styles
    if (storedDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, []);

  // Toggle dark mode and apply styles globally
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

  // Handle notification settings
  const handleNotificationChange = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Dark Mode */}
      <div
        className={`shadow-md rounded-lg p-6 mb-6 card ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">Appearance</h2>
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {darkMode ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div
        className={`shadow-md rounded-lg p-6 mb-6 card ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        {["email", "sms", "push"].map((type) => (
          <div key={type} className="flex items-center justify-between py-2">
            <span>{type.toUpperCase()} Notifications</span>
            <button
              onClick={() => handleNotificationChange(type)}
              className={`px-4 py-2 rounded ${
                notifications[type]
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {notifications[type] ? "Enabled" : "Disabled"}
            </button>
          </div>
        ))}
      </div>

      {/* Privacy & Security */}
      <div
        className={`shadow-md rounded-lg p-6 mb-6 card ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">Privacy & Security</h2>
        <p className="mb-4">Manage your privacy settings.</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete Account
        </button>
      </div>

      {/* Logout Button */}
      <div className="text-center">
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
