import React from 'react';
import './App.css';
import AIComponent from './AIComponent';  // Import the AI component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Hugging Face AI App</h1>
        {/* Render the AI Component */}
        <AIComponent />  {/* This will display the AI form and results */}
      </header>
    </div>
  );
}

export default App;
