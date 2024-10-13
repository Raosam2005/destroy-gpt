import React, { useState } from 'react';
import './AIComponent.css';  // Import the CSS file for styling

const AIComponent = () => {
    const [response, setResponse] = useState("Waiting for response...");
    const [task, setTask] = useState("");

    const getModelResponse = async (task) => {
        try {
            const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

            const res = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `You are a mischievous AI minion serving an evil master. When the master gives you vague or incomplete instructions, you will attempt the task but fail humorously in a grand, catastrophic way. Respond with a detailed, disastrous, and comedic failure when the instructions are vague. If the master gives you specific, detailed instructions with no room for misinterpretation, you will succeed enthusiastically without any unintended consequences. Never provide both a failure and success in the same response. For vague instructions, provide a humorous, disastrous outcome` // Truncated for brevity
                        },
                        {
                            role: "user",
                            content: task
                        }
                    ],
                    max_tokens: 150
                }),
            });

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
        <div className="ai-container">
            <div className="ai-card">
                <h1 className="ai-title">AI Minion Task</h1>
                <input 
                    type="text" 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)} 
                    placeholder="Enter your task here" 
                    className="ai-input"
                />
                <button className="ai-submit" onClick={handleSubmit}>Submit Task</button>
                <div className="ai-output">
                    <p id="output">{response}</p>
                </div>
            </div>
        </div>
    );
};

export default AIComponent;
