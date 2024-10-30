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

  useEffect(() => {
    // Retrieve daily actions from local storage
    const storedActions = localStorage.getItem("dailyActions");
    if (storedActions) {
      setDailyActions(JSON.parse(storedActions)); // Set state if actions exist
    }
  }, []);

  return (
    <div className="flex flex-col h-screen items-center w-full bg-[#f2f2f2] dark:bg-[#242933] overflow-hidden">
      <Navbar />
      <div className="flex h-screen justify-evenly w-full items-center">
        {dailyActions ? (
          <>
            <GoalCard />
            <GoalCompletion />
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
