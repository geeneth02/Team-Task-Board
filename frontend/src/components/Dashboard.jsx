import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Import your friend's component
import NotificationsPanel from './NotificationsPanel'; 
import './Dashboard.css';

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/>
  </svg>
);

const AssignIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
  </svg>
);

// New Bell Icon for the header
const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a202c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('myWork');
  
  // 2. Add a state variable to control whether the popup is open or closed
  const [showNotifications, setShowNotifications] = useState(false); 
  
  const navigate = useNavigate();

  const tasks = [
    {
      id: 1,
      title: 'UI Design',
      sub: 'with consultation',
      assignee: 'Amaya (Ui designer)',
      date: '22/15/2026',
      status: 'red'
    },
    {
      id: 2,
      title: 'Backend code',
      sub: 'with consultation',
      assignee: 'Anush',
      date: '22/15/2026',
      status: 'green'
    }
  ];

  const placeholders = Array.from({ length: 10 });

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="profile-header">
          <div className="avatar-placeholder"></div>
          <span className="profile-name">ABC Holdings</span>
        </div>

        <div className="sidebar-white-card">
          <nav className="nav-menu">
            <button className="nav-btn active">
              <DashboardIcon />
              <span>DashBoard</span>
            </button>
            <button className="nav-btn" onClick={() => navigate('/assign')}>
              <AssignIcon />
              <span>Assign</span>
            </button>
            <button className="nav-btn" onClick={() => navigate('/all-works')}>
              <FolderIcon />
              <span>All Works</span>
            </button>
          </nav>

          <div className="sidebar-bottom">
            <button className="logout-link" onClick={() => navigate('/')}>Logout</button>
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="main-viewport">
        
        {/* 3. Updated Header with the Bell Button */}
        <header className="top-navbar" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
            >
              <BellIcon />
              {/* Optional tiny red dot indicating new notifications */}
              <span style={{ position: 'absolute', top: '0px', right: '2px', width: '8px', height: '8px', backgroundColor: '#e53e3e', borderRadius: '50%' }}></span>
            </button>

            <div className="manager-profile">
              <div className="manager-avatar"></div>
              <div className="manager-info">
                <span className="manager-title">Manager ˅</span>
                <span className="manager-date">21/12/2026</span>
              </div>
            </div>
          </div>

          {/* 4. Render the panel only if the bell is clicked */}
          {showNotifications && <NotificationsPanel />}
        </header>

        <main className="content-container">
          <div className="tab-header">
            <button
              className={`tab-link ${activeTab === 'myWork' ? 'active' : ''}`}
              onClick={() => setActiveTab('myWork')}
            >
              My work
            </button>
            <button
              className={`tab-link ${activeTab === 'assignedWork' ? 'active' : ''}`}
              onClick={() => setActiveTab('assignedWork')}
            >
              Assigned work
            </button>
          </div>

          <div className="grid-canvas">
            {activeTab === 'myWork' && (
              <>
                {tasks.map((task) => (
                  <div className="task-card" key={task.id}>
                    <div className={`accent-bar ${task.status}`}></div>
                    <div className="task-content">
                      <h3 className="task-title">{task.title}</h3>
                      <span className="task-subtext">{task.sub}</span>
                      <div className="assignee-tag">
                        <span className="grey-dot"></span>
                        <span className="assignee-text">{task.assignee}</span>
                      </div>
                      <span className="date-text">{task.date}</span>
                    </div>
                  </div>
                ))}

                {placeholders.map((_, i) => (
                  <div className="task-card placeholder" key={i}></div>
                ))}
              </>
            )}

            {activeTab === 'assignedWork' && (
              <div className="empty-view">No assigned work available</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}