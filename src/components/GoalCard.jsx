import { useState } from "react";

const GoalCard = () => {
  const Actions = localStorage.getItem("dailyActions");
  const goal = JSON.parse(Actions);

  // Calculate the total number of steps
  const totalSteps = goal.week.reduce(
    (total, week) =>
      total +
      week.days.reduce((dayTotal, day) => dayTotal + day.steps.length, 0),
    0
  );

  // State to track which steps are checked
  const [checkedSteps, setCheckedSteps] = useState(
    Array(totalSteps).fill(false)
  );
  const [progress, setProgress] = useState(0);

  // Update the progress whenever a checkbox is clicked
  const handleCheckboxChange = (index) => {
    const updatedCheckedSteps = [...checkedSteps];
    updatedCheckedSteps[index] = !updatedCheckedSteps[index];
    setCheckedSteps(updatedCheckedSteps);

    // Calculate progress percentage
    const completedSteps = updatedCheckedSteps.filter(
      (checked) => checked
    ).length;
    const newProgress = (completedSteps / totalSteps) * 100;
    setProgress(newProgress);
  };

  return (
    <div className="p-4 flex flex-col items-center max-w-2xl shadow-md bg-white dark:bg-[#2a303c] min-h-36 rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">
        {goal.goalName}
      </h1>
      <p className="text-gray-400 mt-3">
        Progress: {Math.round(progress)}% Complete
      </p>
      <div
        className="bg-green-500 h-2 w-full max-w-2xl mt-3 rounded-full"
        style={{ width: `${progress}%` }}
      />
      <p className="mt-4 mb-0 text-center text-pretty text-md">{goal.desc}</p>

      <div className="carousel carousel-center max-w-lg p-4 space-x-4">
        {goal.week.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className="carousel-item p-4 bg-[#f2f2f2] dark:bg-[#2a303c] rounded-lg w-full max-w-lg"
            >
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800 dark:text-gray-300">
                  Day {day.day}
                </p>
                <ul className="ml-4 mt-3 space-y-2 text-gray-800 dark:text-gray-400">
                  {day.steps.map((step, stepIndex) => {
                    // Calculate a unique index for each step
                    const uniqueIndex =
                      weekIndex * 7 + dayIndex * day.steps.length + stepIndex;
                    return (
                      <li
                        key={stepIndex}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={checkedSteps[uniqueIndex]}
                          onChange={() => handleCheckboxChange(uniqueIndex)}
                          className="checkbox checkbox-sm border-green-500 [--chkbg:white] [--chkfg:green] checked:border-green-500"
                        />
                        <span>{step}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalCard;
