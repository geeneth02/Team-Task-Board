import React, { useState } from 'react';
import TaskCard from './TaskCard';

export default function TaskBoard() {
  const [activeTab, setActiveTab] = useState('all');

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

  // DRY Configuration for tabs
  // DRY Configuration for tabs
  const tabConfigs = [
    // Changed inactiveColor from '#ffffff' to '#2b74e2'
    { id: 'all', label: 'All', activeColor: '#2b74e2', inactiveColor: '#2b74e2', badgeBg: '#8fa0e6' },
    { id: 'todo', label: 'To-do', activeColor: '#D94545', inactiveColor: '#D94545', badgeBg: '#D94545' },
    { id: 'progress', label: 'In-progress', activeColor: '#ECA336', inactiveColor: '#ECA336', badgeBg: '#ECA336' },
    { id: 'done', label: 'Done', activeColor: '#5FAD77', inactiveColor: '#5FAD77', badgeBg: '#5FAD77' }
  ];
  return (
    <div className="board-container">
      {/* Top Tabs Bar */}
      <div className="board-tabs-bar">
        {tabConfigs.map(tab => {
          const isActive = activeTab === tab.id;
          
          return (
            <div 
              key={tab.id}
              className={isActive ? "tab-active" : "tab-inactive"} 
              style={{ 
                color: isActive ? tab.activeColor : tab.inactiveColor,
                // Inactive tabs get a border matching their color; active tabs get no border
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

      {/* Main Board Area */}
      <div className="board-area">
        {filteredTasks.map(task => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>

      {/* Footer Legend */}
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
  );
}