import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png"; // Adjust the path if necessary

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  // Apply saved dark mode preference on initial load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
  }, [darkMode]);

  return (
    <div className="navbar flex flex-row justify-between items-center bg-white shadow-none dark:bg-[#2a303c] text-gray-900 dark:text-gray-100 mt-8 p-2 rounded-2xl   max-w-xl">
      {/* Logo and Title */}
      <a className="btn btn-ghost px-2 items-center">
        <img src={logo} alt="SparkTab Logo" className="h-8 w-8" />
      </a>

      {/* <a className="text-xl font-semibold">SparkTab</a> */}
      <a className="btn btn-ghost normal-case text-xl dark:text-gray-300">
        SparkTab
      </a>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="focus:outline-none btn btn-ghost px-2"
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-500" /> // Light Mode Icon
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-500" /> // Dark Mode Icon
        )}
      </button>
    </div>
  );
};

export default Navbar;
