// src/components/HabitCompletion.jsx

import { CheckIcon } from "@heroicons/react/24/solid";

const GoalCompletion = () => {
  const completedDays = [0, 1, 2, 7, 8, 9, 14, 15, 16]; // Example completed days indices
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"]; // Day labels for the week

  return (
    <div className="bg-white dark:bg-[#2a303c] h-56 rounded-2xl shadow-md p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <span className="text-2xl mr-2" role="img" aria-label="Workout">
            💻
          </span>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">
            Consistency
          </h2>
        </div>
        <CheckIcon className="h-6 w-6 text-green-500" />
      </div>

      <div className="flex justify-between mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-300">
            3
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-400">Streak</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-300">
            100%
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-400">
            Consistency
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-300">
            1
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-400">Check-ins</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayLabels.map((label, index) => (
            <span
              key={label + index}
              className="text-xs text-gray-500 text-center"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flex items-center justify-center">
              {completedDays.includes(i) ? (
                <div className="h-4 w-4 bg-green-500 rounded" />
              ) : (
                <div className="h-4 w-4 border border-gray-400 dark:border-gray-300 rounded" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalCompletion;
