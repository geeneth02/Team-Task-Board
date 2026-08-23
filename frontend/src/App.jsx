import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import AllWorks from './components/AllWorks';

function App() {
  return (
    <div>
      <Routes>
        {/* Default login screen */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Amaya's dashboard screen */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Vihanga's all works screen */}
        <Route path="/all-works" element={<AllWorks />} />
      </Routes>
    </div>
  );
}

export default App;