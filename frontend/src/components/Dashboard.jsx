import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('myWork');
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
          <span className="profile-name">BLA BLA</span>
        </div>

        <div className="sidebar-white-card">
          <button className="hamburger-btn" aria-label="Toggle menu">☰</button>

          <nav className="nav-menu">
            <button className="nav-btn active">
              <DashboardIcon />
              <span>DashBoard</span>
            </button>
            <button className="nav-btn">
              <AssignIcon />
              <span>Assign</span>
            </button>
            <button className="nav-btn">
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
        <header className="top-navbar">
          <div className="manager-profile">
            <div className="manager-avatar"></div>
            <div className="manager-info">
              <span className="manager-title">Manager ˅</span>
              <span className="manager-date">21/12/2026</span>
            </div>
          </div>
        </header>

        <main className="content-container">
          {/* Foldered Tab Bar */}
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

          {/* Card Canvas */}
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