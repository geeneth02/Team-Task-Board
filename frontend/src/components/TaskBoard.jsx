import React, { useState } from 'react';
import TaskCard from './TaskCard';

export default function TaskBoard() {
  // 1. Set up state to track the active tab. Default is 'all'.
  const [activeTab, setActiveTab] = useState('all');

  // Mock data with updated assignees
  const tasks = [
    { id: 1, title: 'API integration', subtitle: 'with consultation', assignee: 'Amaya', type: 'todo' },
    { id: 2, title: 'API integration', assignee: 'Geeneth', type: 'todo' },
    { id: 3, title: 'API integration', assignee: 'Vihanga', type: 'progress' },
    { id: 4, title: 'API integration', type: 'progress' },
    { id: 5, title: 'UI / UX Design', type: 'done' },
    { id: 6, title: 'UI / UX Design', type: 'done' },
  ];

  // 2. Filter the tasks based on the active state
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    return task.type === activeTab;
  });

  // 3. Dynamically calculate the numbers in the badges
  const counts = {
    all: tasks.length,
    todo: tasks.filter(t => t.type === 'todo').length,
    progress: tasks.filter(t => t.type === 'progress').length,
    done: tasks.filter(t => t.type === 'done').length,
  };

  return (
    <div className="board-container">
      {/* Top Tabs Bar */}
      <div className="board-tabs-bar">
        {/* Added onClick handlers and pointer cursors to make them clickable */}
        <div 
          className="tab-all" 
          style={{ cursor: 'pointer', opacity: activeTab === 'all' ? 1 : 0.7 }}
          onClick={() => setActiveTab('all')}
        >
          All <span className="badge" style={{ backgroundColor: '#8fa0e6' }}>{counts.all}</span>
        </div>
        
        <div 
          className="tab-pill" 
          style={{ 
            color: '#D94545', 
            cursor: 'pointer', 
            border: activeTab === 'todo' ? '1px solid #D94545' : '1px solid transparent' 
          }}
          onClick={() => setActiveTab('todo')}
        >
          To-do <span className="badge" style={{ backgroundColor: '#D94545' }}>{counts.todo}</span>
        </div>
        
        <div 
          className="tab-pill" 
          style={{ 
            color: '#ECA336', 
            cursor: 'pointer',
            border: activeTab === 'progress' ? '1px solid #ECA336' : '1px solid transparent'
          }}
          onClick={() => setActiveTab('progress')}
        >
          In-progress <span className="badge" style={{ backgroundColor: '#ECA336' }}>{counts.progress}</span>
        </div>
        
        <div 
          className="tab-pill" 
          style={{ 
            color: '#5FAD77', 
            cursor: 'pointer',
            border: activeTab === 'done' ? '1px solid #5FAD77' : '1px solid transparent'
          }}
          onClick={() => setActiveTab('done')}
        >
          Done <span className="badge" style={{ backgroundColor: '#5FAD77' }}>{counts.done}</span>
        </div>
      </div>

      {/* Main Board Area - Now mapping over filteredTasks instead of all tasks */}
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