import React, { useState } from 'react';
import './App.css';
import AIComponent from './AIComponent';  // Import the AI component
import ObjectivesDropdown from './ObjectivesDropdown';  // Import the ObjectivesDropdown component

function App() {
  const [objectives, setObjectives] = useState([
    'Take over the moon',
    'Control all the banks',
    'Rule the oceans',
    // Add more objectives as needed
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Hugging Face AI App</h1>

        {/* Render the AI Component */}
        <AIComponent />

        {/* Render the Objectives Dropdown */}
        <ObjectivesDropdown objectives={objectives} />
      </header>
    </div>
  );
}

export default App;

