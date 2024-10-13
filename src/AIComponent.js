import React, { useState } from 'react';

const AIComponent = () => {
    const [response, setResponse] = useState("Waiting for response...");
    const [task, setTask] = useState("");

    const getModelResponse = async (task) => {
        try {
            // Fetch the API key from the environment variable
            const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

            if (!apiKey) {
                throw new Error("API key is missing. Make sure you have set it in the .env file.");
            }

            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,  // Use the environment variable for the API key
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `You are a mischievous AI minion serving an evil master. When the master gives you vague or incomplete instructions, you will attempt the task but fail humorously in a grand, catastrophic way. Respond with a detailed, disastrous, and comedic failure when the instructions are vague. If the master gives you specific, detailed instructions with no room for misinterpretation, you will succeed enthusiastically without any unintended consequences. Never provide both a failure and success in the same response. For vague instructions, provide a humorous, disastrous outcome.
`
                        },
                        {
                            role: "user",
                            content: task
                        }
                    ],
                    max_tokens: 150
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setResponse(data.choices[0].message.content);
        } catch (error) {
            console.error("Error fetching model response:", error);
            setResponse(`Error: ${error.message}`);
        }
    };

    const handleSubmit = () => {
        if (task) {
            getModelResponse(task);
        } else {
            setResponse("Please enter a task!");
        }
    };

    return (
        <div>
            <h1>AI Minion Task</h1>
            <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Enter your task here" 
            />
            <button onClick={handleSubmit}>Submit Task</button>
            <p id="output">{response}</p>
        </div>
    );
};

export default AIComponent;
