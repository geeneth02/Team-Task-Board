import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Make the login page the default starting screen */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Set up the path to navigate to the dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;