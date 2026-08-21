import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <TaskBoard />
      </div>
    </div>
  );
}

export default App;