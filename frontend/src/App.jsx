import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import TaskBoard from './components/TaskBoard'; 
// 1. Import your new Assign component
import Assign from './components/Assign'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-works" element={<TaskBoard />} />
        
        {/* 2. Render your Assign component here */}
        <Route path="/assign" element={<Assign />} />
      </Routes>
    </div>
  );
}

export default App;