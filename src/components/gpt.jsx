import { useState } from "react";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Make sure to set your API key in an .env file
  dangerouslyAllowBrowser: true,
});

const GPT = () => {
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);

  const handleSendMessage = async () => {
    // Add user message to responses
    const newMessages = [...responses, { role: "user", content: userInput }];
    setResponses(newMessages);

    // Call OpenAI API
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: newMessages,
      });

      // Add assistant message to responses
      const assistantMessage = completion.choices[0].message.content;
      setResponses((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setUserInput(""); // Clear the input field
    }
  };

  return (
    <div>
      <h1>Chat with GPT-4</h1>
      <div>
        {responses.map((msg, index) => (
          <div key={index} className={msg.role}>
            <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default GPT;

const plan = {
  month: 1,
  weeks: [
    {
      weekNumber: 1,
      days: [
        {
          dayNumber: 1,
          steps: [
            "Take an initial typing test to measure current WPM.",
            "Familiarize yourself with the home row positioning.",
            "Practice basic typing exercises for 15 minutes using a typing software or website.",
          ],
        },
        {
          dayNumber: 3,
          steps: [
            "Focus on typing accuracy with short, common words.",
            "Use an online typing game to maintain motivation and engagement, practice for 20 minutes.",
            "Review and correct typing errors from your session.",
          ],
        },
        {
          dayNumber: 5,
          steps: [
            "Increase practice time to 30 minutes focusing on speed and error reduction.",
            "Practice typing numbers and special characters.",
            "Check progress by re-taking a typing test.",
          ],
        },
      ],
    },
    {
      weekNumber: 2,
      days: [
        {
          dayNumber: 8,
          steps: [
            "Introduce intermediate-level typing lessons focusing on speed improvement.",
            "Attach focus for 15 minutes on weaker keys and hand positions.",
            "Celebrate small milestones to stay motivated.",
          ],
        },
        {
          dayNumber: 10,
          steps: [
            "Practice typing full sentences to improve fluidity.",
            "Engage with online typing races or contests for 20 minutes.",
            "Set a specific WPM target for the day and strive to achieve it.",
          ],
        },
        {
          dayNumber: 12,
          steps: [
            "Revisit typing basics to reinforce good habits.",
            "Increase complexity with longer paragraphs for 30 minutes.",
            "Analyze typing test results to identify improvement areas.",
          ],
        },
      ],
    },
    {
      weekNumber: 3,
      days: [
        {
          dayNumber: 15,
          steps: [
            "Dedicate 15 minutes to focused practice on the weakest keys.",
            "Work on typing accuracy by practicing with difficult words.",
            "Play an advanced-level typing game to test skills under pressure.",
          ],
        },
        {
          dayNumber: 17,
          steps: [
            "Watch video tutorials on advanced typing techniques and tricks.",
            "Engage in continuous typing drills for 20 minutes without looking at the keyboard.",
            "Review typing stats and strategize further practice sessions.",
          ],
        },
        {
          dayNumber: 19,
          steps: [
            "Simulate real-life typing situations by typing textual content like articles or essays.",
            "Track your consistency over a 5-minute typing session.",
            "Reward yourself for consistency and progress.",
          ],
        },
      ],
    },
    {
      weekNumber: 4,
      days: [
        {
          dayNumber: 22,
          steps: [
            "Reflect on initial goals and adjust focus areas if necessary.",
            "Practice in short bursts of 7-10 minutes multiple times in the day.",
            "Prepare a list of tricky words and practice them intensively.",
          ],
        },
        {
          dayNumber: 24,
          steps: [
            "Visualize keyboard layout without looking for mental practice.",
            "Engage in high-paced typing challenges for endurance.",
            "Compare recent typing tests with initial results to note significant improvements.",
          ],
        },
        {
          dayNumber: 26,
          steps: [
            "Conduct a comprehensive 1-hour practice session.",
            "Take a final typing test to evaluate progress against the 100 WPM target.",
            "Celebrate the achievement or plan an additional wrap-up week for polishing skills if needed.",
          ],
        },
      ],
    },
  ],
};
