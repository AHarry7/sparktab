import { useState } from "react";

// Main Hero Section Component
const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="flex flex-col border-1 items-start my-auto justify-center bg-[#f2f2f2] dark:bg-[#242933] text-start">
      <h1 className="min-w-full text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
        <span className="text-green-500">Upgrade your</span> <br />
        <span className="text-gray-800 dark:text-gray-300">life with AI</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-800 dark:text-gray-400 max-w-md mb-8">
        Transform your goals into daily actions with personalized AI guidance.
      </p>
      <button
        onClick={toggleModal}
        className="btn bg-green-500 hover:bg-green-600 border-none text-white font-bold py-3 px-6 rounded-full text-md mb-4 transition duration-300 ease-in-out transform hover:scale-105"
      >
        START MY JOURNEY
      </button>
      {showModal && <GoalSettingModal closeModal={toggleModal} />}
    </div>
  );
};

// Goal Setting Modal Component

// eslint-disable-next-line react/prop-types
const GoalSettingModal = ({ closeModal }) => {
  const [goal, setGoal] = useState("");
  const [dailyActions, setDailyActions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const handleGoalSubmit = async () => {
    if (goal.trim() === "") {
      setError("Please enter a goal before proceeding.");
      return; // Exit the function early if goal is empty
    }

    setLoading(true);
    setError("");
    const prompt = `Create a daily action plan for the following goal: "${goal}". Provide your response *only* as a valid JSON object, exactly in this format:
{
  "goalName": "Goal Name Here",
  "desc": "Description Here",
  "week": [
    {
      "days": [
        { "day": 1, "steps": ["step1", "step2", "step3"] },
        { "day": 2, "steps": ["step1", "step2", "step3"] },
        { "day": 3, "steps": ["step1", "step2", "step3"] },
        { "day": 4, "steps": ["step1", "step2", "step3"] },
        { "day": 5, "steps": ["step1", "step2", "step3"] },
        { "day": 6, "steps": ["step1", "step2", "step3"] },
        { "day": 7, "steps": ["step1", "step2", "step3"] }
      ]
    }
  ]
}

No additional explanations, introductions, or text outside of the object.`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 500,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Extract JSON portion from response
        const resultText = data.choices[0].message.content;
        const jsonString = resultText.match(/\{[\s\S]*\}/)[0];
        console.log("Extracted JSON string:", jsonString); // Log the raw JSON string
        try {
          const parsedGoalPlan = JSON.parse(jsonString);
          console.log("Parsed Goal Plan:", parsedGoalPlan);
          setDailyActions(parsedGoalPlan);
          localStorage.setItem("dailyActions", JSON.stringify(parsedGoalPlan));
          closeModal();
        } catch (parseError) {
          console.error("Failed to parse JSON:", parseError);
          setError("Error parsing plan data.");
        }
      } else {
        throw new Error(data.error.message || "An error occurred.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl animate-fade-in">
        <button
          onClick={closeModal}
          className="float-right text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200 text-center">
          Weeklify Your Goal
        </h2>

        <div className="text-lg text-center mb-6">
          <span className="text-gray-600 dark:text-gray-300">
            I want to achieve
          </span>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="proficieny in python language"
            className="inline-block mx-2 px-2 py-1 border-b w-80 border-gray-300 dark:border-gray-600 dark:bg-gray-800 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:border-blue-500 text-lg transition"
          />
        </div>

        <button
          onClick={handleGoalSubmit}
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition mt-4"
          disabled={loading}
        >
          {loading ? "Weeklifying your goal..." : "Weeklify"}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default HeroSection;
