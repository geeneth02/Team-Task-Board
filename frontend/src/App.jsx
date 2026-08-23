import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import TaskBoard from './components/TaskBoard'; 
import Assign from './components/Assign'; 
import SignupPage from './components/SignupPage';
// Import your friend's new component
import AddTask from './components/AddTask'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-works" element={<TaskBoard />} />
        <Route path="/assign" element={<Assign />} />
        
        {/* The new route for your friend's work */}
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </div>
  );
}

export default App;