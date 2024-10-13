import React, { useState } from 'react';
import './ObjectivesDropdown.css';  // Import the CSS file for the button

const ObjectivesDropdown = ({ objectives }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        {isOpen ? 'Hide Objectives' : 'Show Objectives'}
      </button>

      {isOpen && (
        <ul className="objectives-list">
          {objectives.length === 0 ? (
            <li>No objectives left</li>
          ) : (
            objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ObjectivesDropdown;
