import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import TaskBoard from './components/TaskBoard'; 
import Assign from './components/Assign'; 
// 1. Import the new Signup component
import SignupPage from './components/SignupPage'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-works" element={<TaskBoard />} />
        <Route path="/assign" element={<Assign />} />
        
        {/* 2. Add the Route for the Signup page */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;