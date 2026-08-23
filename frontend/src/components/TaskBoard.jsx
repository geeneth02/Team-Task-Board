import React, { useState } from 'react';
import TaskCard from './TaskCard';
import Sidebar from './Sidebar'; // Brings back the Sidebar component
import Header from './Header';   // Brings back the Header component
import '../App.css';              // CRITICAL: This reconnects your styling! (Change to './Allworks.css' if you put your styles there)

export default function Allworks() {
  const [activeTab, setActiveTab] = useState('all');

  // Your tasks and configs stay exactly the same
  const tasks = [
    { id: 1, title: 'API integration', subtitle: 'with consultation', assignee: 'Amaya', type: 'todo' },
    { id: 2, title: 'API integration', type: 'todo' },
    { id: 3, title: 'API integration', type: 'progress' },
    { id: 4, title: 'API integration', type: 'progress' },
    { id: 5, title: 'UI / UX Design', type: 'done' },
    { id: 6, title: 'UI / UX Design', type: 'done' },
  ];

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    return task.type === activeTab;
  });

  const counts = {
    all: tasks.length,
    todo: tasks.filter(t => t.type === 'todo').length,
    progress: tasks.filter(t => t.type === 'progress').length,
    done: tasks.filter(t => t.type === 'done').length,
  };

  const tabConfigs = [
    { id: 'all', label: 'All', activeColor: '#2b74e2', inactiveColor: '#2b74e2', badgeBg: '#8fa0e6' },
    { id: 'todo', label: 'To-do', activeColor: '#D94545', inactiveColor: '#D94545', badgeBg: '#D94545' },
    { id: 'progress', label: 'In-progress', activeColor: '#ECA336', inactiveColor: '#ECA336', badgeBg: '#ECA336' },
    { id: 'done', label: 'Done', activeColor: '#5FAD77', inactiveColor: '#5FAD77', badgeBg: '#5FAD77' }
  ];

  return (
    /* 1. Wrap everything in your main flex container */
    <div className="app-container">
      
      {/* 2. Place the Sidebar on the left */}
      <Sidebar />
      
      {/* 3. Wrap the Header and Board in the right-hand column */}
      <div className="main-content">
        <Header />
        
        {/* Your Board Component */}
        <div className="board-container">
          <div className="board-tabs-bar">
            {tabConfigs.map(tab => {
              const isActive = activeTab === tab.id;
              
              return (
                <div 
                  key={tab.id}
                  className={isActive ? "tab-active" : "tab-inactive"} 
                  style={{ 
                    color: isActive ? tab.activeColor : tab.inactiveColor,
                    border: isActive ? 'none' : `1px solid ${tab.inactiveColor}`
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label} 
                  <span className="badge" style={{ backgroundColor: tab.badgeBg }}>
                    {counts[tab.id]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="board-area">
            {filteredTasks.map(task => (
              <TaskCard key={task.id} {...task} />
            ))}
          </div>

          <div className="board-footer">
            <div className="legend-item">
              <div className="legend-box" style={{ backgroundColor: '#D94545' }}></div> To - do
            </div>
            <div className="legend-item">
              <div className="legend-box" style={{ backgroundColor: '#ECA336' }}></div> In - Progress
            </div>
            <div className="legend-item">
              <div className="legend-box" style={{ backgroundColor: '#A2E6B8' }}></div> Finished
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}