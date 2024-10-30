// import GPT from "./components/gpt";
// import AskGpt from "./components/AskGpt";
import GoalCompletion from "./components/GoalCompletion";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import GoalCard from "./components/GoalCard";
import { useEffect, useState } from "react";
// import { SparklesPreview } from "./components/spark";

const App = () => {
  const [dailyActions, setDailyActions] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState([]);
  const [completedDays, setCompletedDays] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const storedActions = localStorage.getItem("dailyActions");
    if (storedActions) {
      const goal = JSON.parse(storedActions);
      setDailyActions(goal);

      // Initialize `checkedSteps` array based on total steps
      const totalSteps = goal.week.reduce(
        (total, week) =>
          total +
          week.days.reduce((dayTotal, day) => dayTotal + day.steps.length, 0),
        0
      );
      setCheckedSteps(Array(totalSteps).fill(false));
    }
  }, []);

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
  };

  return (
    <div className="flex flex-col h-screen items-center w-full bg-[#f2f2f2] dark:bg-[#242933] overflow-hidden">
      <Navbar />
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
