import { useEffect, useState } from "react";
import GoalCard from "./components/GoalCard";
import GoalCompletion from "./components/GoalCompletion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection"; // Import HeroSection correctly
import ConfettiExplosion from "react-confetti-explosion";
import GoalCompletionStatic from "./components/GoalCompletionStatic";

const App = () => {
  const [dailyActions, setDailyActions] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [completedDays, setCompletedDays] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load daily actions from local storage on mount
    const storedActions = localStorage.getItem("dailyActions");
    const storedCheckedSteps = localStorage.getItem("checkedSteps");
    const storedCompletedDays = localStorage.getItem("completedDays");
    const storedProgress = localStorage.getItem("progress");

    if (storedActions) {
      const goal = JSON.parse(storedActions);
      setDailyActions(goal);

      // Initialize checkedSteps array based on total steps
      const totalSteps = goal.week.reduce(
        (total, week) =>
          total +
          week.days.reduce((dayTotal, day) => dayTotal + day.steps.length, 0),
        0
      );
      setCheckedSteps(Array(totalSteps).fill(false));
    }

    if (storedCheckedSteps) {
      setCheckedSteps(JSON.parse(storedCheckedSteps));
    }
    if (storedCompletedDays) {
      setCompletedDays(JSON.parse(storedCompletedDays));
    }
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  // Save state to local storage whenever checkedSteps, completedDays, or progress change
  useEffect(() => {
    localStorage.setItem("checkedSteps", JSON.stringify(checkedSteps));
    localStorage.setItem("completedDays", JSON.stringify(completedDays));
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [checkedSteps, completedDays, progress]);

  const handleCheckboxChange = (index) => {
    const updatedCheckedSteps = [...checkedSteps];
    updatedCheckedSteps[index] = !updatedCheckedSteps[index]; // Toggle specific index

    setCheckedSteps(updatedCheckedSteps); // Update entire array

    // Ensure totalSteps calculation matches the goal's length
    const totalSteps = dailyActions.week.reduce(
      (total, week) =>
        total +
        week.days.reduce((dayTotal, day) => dayTotal + day.steps.length, 0),
      0
    );

    const completedSteps = updatedCheckedSteps.filter(
      (checked) => checked
    ).length;
    const newProgress = (completedSteps / totalSteps) * 100;
    setProgress(newProgress);

    const newCompletedDays = [];
    dailyActions.week.forEach((week, weekIndex) => {
      week.days.forEach((day, dayIndex) => {
        const daySteps = day.steps.length;
        const startIndex = (weekIndex * 7 + dayIndex) * daySteps;

        const allStepsChecked = updatedCheckedSteps
          .slice(startIndex, startIndex + daySteps)
          .every((checked) => checked);

        if (allStepsChecked) {
          newCompletedDays.push(dayIndex + weekIndex * 7);
        }
      });
    });

    setCompletedDays(newCompletedDays);
    if (updatedCheckedSteps[index]) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 2000);
    }
  };

  // Function to open the delete confirmation modal
  const confirmDelete = () => setIsModalOpen(true);

  const handleDelete = () => {
    // Clear goal data from state
    setDailyActions(null);
    setCheckedSteps([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    setCompletedDays([]);
    setProgress(0);

    // Remove goal data from local storage
    localStorage.removeItem("dailyActions");
    localStorage.removeItem("checkedSteps");
    localStorage.removeItem("completedDays");
    localStorage.removeItem("progress");
    setIsModalOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col h-screen items-center w-full bg-[#f2f2f2] dark:bg-[#242933] overflow-hidden">
      <Navbar />

      {isExploding && <ConfettiExplosion />}
      <div className="flex h-screen justify-evenly w-full items-center">
        {dailyActions ? (
          <>
            <GoalCard
              goal={dailyActions}
              checkedSteps={checkedSteps}
              handleCheckboxChange={handleCheckboxChange}
              progress={progress}
              onDelete={confirmDelete}
            />
            <GoalCompletion completedDays={completedDays} />
          </>
        ) : (
          <>
            <HeroSection setDailyActions={setDailyActions} />
            <GoalCompletionStatic />
          </>
        )}
      </div>

      {/* Modal for delete confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
              Are you sure you want to delete this goal?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
