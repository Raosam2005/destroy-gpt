import React, { useState } from 'react';
import axios from 'axios';

const AIComponent = () => {
  const [task, setTask] = useState('');        // Stores user input
  const [response, setResponse] = useState('');  // Stores AI response
  const [loading, setLoading] = useState(false); // Loading state for API call

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while waiting for API response

    try {
      // Make a POST request to Hugging Face Inference API
      const result = await axios.post(
        'https://api-inference.huggingface.co/models/openai-community/gpt2',  // API URL for Hugging Face GPT-2 model
        { inputs: task },  // User's task as input
        {
          headers: {
            'Authorization': `Bearer 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`,  // Your Hugging Face API key
          },
        }
      );

      // Log the full response to check what the API is returning
      console.log(result.data);

      // Extract the generated_text from the first item in the array
      const generatedText = result.data[0]?.generated_text || "AI didn't understand the task.";
      
      // Set the response to be displayed
      setResponse(generatedText);
    } catch (error) {
      console.error('Error with Hugging Face API:', error.response ? error.response.data : error.message);
      setResponse("Error processing your request.");
    }

    setLoading(false); // Set loading back to false after API call
  };

  return (
    <div>
      <h1>Hugging Face-Driven AI</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Tell the AI what to do"
        />
        <button type="submit">Submit Task</button>
      </form>

      {loading ? <p>Loading...</p> : <p>{response}</p>}
    </div>
  );
};

export default AIComponent;
