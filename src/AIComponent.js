import React, { useState } from 'react';

const AIComponent = () => {
    const [response, setResponse] = useState("Waiting for response...");
    const [task, setTask] = useState("");

    const getModelResponse = async (task) => {
        try {
            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer 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`, // Fake API Key
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
                            content: task // The task from the user input
                        }
                    ],
                    max_tokens: 150
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            if (data.choices && data.choices[0]) {
                setResponse(data.choices[0].message.content);
            }
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
