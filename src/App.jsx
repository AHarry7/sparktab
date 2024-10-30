import { useEffect, useState } from "react";
import GoalCard from "./components/GoalCard";
import GoalCompletion from "./components/GoalCompletion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ConfettiExplosion from "react-confetti-explosion";

const App = () => {
  const [dailyActions, setDailyActions] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [completedDays, setCompletedDays] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    // Load daily actions from local storage
    const storedActions = localStorage.getItem("dailyActions");
    const storedCheckedSteps = localStorage.getItem("checkedSteps");
    const storedCompletedDays = localStorage.getItem("completedDays");

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
  }, []);

  // Save state to local storage whenever checkedSteps or completedDays change
  useEffect(() => {
    localStorage.setItem("checkedSteps", JSON.stringify(checkedSteps));
    localStorage.setItem("completedDays", JSON.stringify(completedDays));
  }, [checkedSteps, completedDays]);

  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    const updatedCheckedSteps = [...checkedSteps];
    updatedCheckedSteps[index] = !updatedCheckedSteps[index];
    setCheckedSteps(updatedCheckedSteps);

    // Calculate progress
    const completedSteps = updatedCheckedSteps.filter(
      (checked) => checked
    ).length;
    const newProgress = (completedSteps / updatedCheckedSteps.length) * 100;
    setProgress(newProgress);

    // Calculate completed days
    if (dailyActions) {
      const newCompletedDays = dailyActions.week.flatMap((week, weekIndex) =>
        week.days
          .map((day, dayIndex) => {
            const daySteps = day.steps.length;
            const startIndex = weekIndex * 7 + dayIndex * daySteps;
            const allStepsChecked = updatedCheckedSteps
              .slice(startIndex, startIndex + daySteps)
              .every((checked) => checked);
            return allStepsChecked ? dayIndex + weekIndex * 7 : null;
          })
          .filter((dayIndex) => dayIndex !== null)
      );

      setCompletedDays(newCompletedDays);
    }
    if (updatedCheckedSteps[index]) {
      // Only trigger confetti on checking the box
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
      }, 2000); // Reset the confetti effect after 2 seconds
    }
  };

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
            />
            <GoalCompletion completedDays={completedDays} />
          </>
        ) : (
          <>
            <HeroSection />
            <GoalCompletion />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
