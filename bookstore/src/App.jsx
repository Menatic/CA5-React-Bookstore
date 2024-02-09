// src/App.jsx
import React, { useState } from 'react';
import Books from './components/Books';
import RegisterForm from './components/Form';
import './App.css'; // Import the CSS file for App component styles

const App = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterForm(!showRegisterForm); // Toggle the visibility of the registration form
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Kalvium Books</h1>
        {showRegisterForm ? null : (
          <button onClick={handleRegisterClick} className="register-button">
            Register
          </button>
        )}
      </div>
      {showRegisterForm ? <RegisterForm /> : <Books />}
    </div>
  );
};

export default App;
