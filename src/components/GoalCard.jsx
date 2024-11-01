/* eslint-disable react/prop-types */
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

/* eslint-disable react/prop-types */
const GoalCard = ({
  goal,
  checkedSteps,
  handleCheckboxChange,
  progress,
  onDelete,
}) => {
  const carouselRef = useRef(null);
  const [showScrollIndicators, setShowScrollIndicators] = useState(false);

  const handleScrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div
      className="p-4 flex flex-col items-start max-w-2xl shadow-md bg-white dark:bg-[#2a303c] min-h-36 rounded-2xl relative"
      onMouseEnter={() => setShowScrollIndicators(true)} // Show indicators on hover
      onMouseLeave={() => setShowScrollIndicators(false)} // Hide indicators on mouse leave
    >
      <h1 className="text-3xl font-bold text-gray-800 mx-auto dark:text-gray-300">
        {goal.goalName}
      </h1>

      {/* Delete Icon */}
      <button
        onClick={onDelete}
        className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
        aria-label="Delete Goal"
      >
        <TrashIcon className="h-6 w-6" />
      </button>

      <p className="text-gray-800 dark:text-gray-300 mt-3 mx-auto">
        Progress: {Math.round(progress)}% Complete
      </p>
      <div
        className="bg-green-500 h-2 w-full max-w-2xl mt-3 rounded-full"
        style={{ width: `${progress}%` }}
      />
      <p className="mt-4 mb-0 text-center text-pretty mx-auto text-md text-gray-800 dark:text-gray-300">
        {goal.desc}
      </p>

      <div className="relative">
        <div
          ref={carouselRef}
          className="carousel carousel-center max-w-lg p-4 space-x-4 overflow-x-auto"
        >
          {goal.week.map((week, weekIndex) =>
            week.days.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="carousel-item p-4 bg-[#f2f2f2] dark:bg-[#2a303c] rounded-lg w-full max-w-lg"
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800 dark:text-gray-300 ml-5">
                    Day {day.day}
                  </p>
                  <ul className="ml-4 mt-3 space-y-2 text-gray-800 dark:text-gray-400">
                    {day.steps.map((step, stepIndex) => {
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

        {/* Scroll Indicators */}
        {showScrollIndicators && (
          <>
            <button
              className="absolute top-1/2 left-0 py-0 px-0 transform -translate-y-1/2 size-6 z-10 bg-green-500 rounded-full text-white"
              onClick={handleScrollLeft}
              aria-label="Scroll Left"
            >
              <span>◀</span>
            </button>

            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-green-500 size-6 rounded-full text-white"
              onClick={handleScrollRight}
              aria-label="Scroll Right"
            >
              ▶
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalCard;
