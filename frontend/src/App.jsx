import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import './App.css'; 

// Temporary placeholder components for the other pages so the router doesn't crash
const Dashboard = () => <div style={{ padding: '30px' }}>Dashboard Page Content</div>;
const Assign = () => <div style={{ padding: '30px' }}>Assign Page Content</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            {/* Default route redirects to All Works */}
            <Route path="/" element={<Navigate to="/works" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assign" element={<Assign />} />
            <Route path="/works" element={<TaskBoard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;