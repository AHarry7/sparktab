import React from "react";

const GoalCompletion = ({ completedDays }) => {
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  // Calculate the streak
  const calculateStreak = (completedDays) => {
    let maxStreak = 0;
    let currentStreak = 0;

    for (let i = 0; i < 7; i++) {
      if (completedDays?.includes(i)) {
        currentStreak++;
      } else {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 0;
      }
    }
    maxStreak = Math.max(maxStreak, currentStreak); // Final check for the current streak
    return maxStreak;
  };

  // Calculate check-ins
  const checkIns = completedDays?.length;

  // Calculate consistency percentage
  const totalDays = 7; // Assuming a week
  const consistency = ((checkIns / totalDays) * 100).toFixed(0) + "%";

  // Get the current streak
  const streak = calculateStreak(completedDays);

  return (
    <div className="bg-white dark:bg-[#2a303c] h-56 rounded-2xl shadow-md p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">
            Consistency
          </h2>
        </div>
        <span className="text-2xl mr-2" role="img" aria-label="Workout">
          🎯
        </span>
      </div>
      <div className="flex justify-between mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-300">
            {streak}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-400">Streak</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-300">
            {consistency}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-400">
            Consistency
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-300">
            {checkIns}
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-400">Check-ins</p>
        </div>
      </div>
      <div className="mb-4">
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
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex items-center justify-center">
            {completedDays?.includes(i) ? (
              <div className="h-4 w-4 bg-green-500 rounded" />
            ) : (
              <div className="h-4 w-4 border border-gray-400 dark:border-gray-300 rounded" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalCompletion;
