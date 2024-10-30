import { useState } from "react";

const LlamaQuery = () => {
  const [response, setResponse] = useState(null);
  const [input, setInput] = useState("");

  const API_URL =
    "https://l7sol6qs4x9pu9j7.us-east-1.aws.endpoints.huggingface.cloud";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const queryLlama = async () => {
    try {
      const payload = {
        inputs: input,
        parameters: {
          top_p: 0.01,
          temperature: 0.7,
          max_new_tokens: 150,
          return_text: true,
          return_full_text: true,
          return_tensors: true,
          clean_up_tokenization_spaces: true,
          prefix: "#",
          handle_long_generation: "hole",
        },
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
      console.log(response.data);

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error querying LLaMA model:", error);
    }
  };

  return (
    <div>
      <h1>Query LLaMA Model</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your query"
      />
      <button onClick={queryLlama}>Send Query</button>

      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default LlamaQuery;
