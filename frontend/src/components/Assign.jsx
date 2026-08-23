import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Inherits the sidebar and header layout!
import './Assign.css';    // Your specific Kanban styles

// SVGs for the navigation menu
const DashboardIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/></svg> );
const AssignIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> );
const FolderIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg> );

export default function Assign() {
  const navigate = useNavigate();

  // Added extra mock data to match your screenshot
  const mockTasks = [
    { id: 1, title: 'UI Design', tag: 'with consultation', assignee: 'Amaya (Ui designer)', date: '22/15/2026', status: 'Not Started' },
    { id: 2, title: 'Backend code', tag: 'with consultation', assignee: 'Anush', date: '22/15/2026', status: 'Not Started' },
    { id: 5, title: 'Market Research', tag: 'with consultation', assignee: 'Ravindu', date: '22/15/2026', status: 'Not Started' },
    { id: 6, title: 'UI Design', tag: 'with consultation', assignee: 'Geeneth', date: '22/15/2026', status: 'Not Started' },
    { id: 7, title: 'UI Design', tag: 'with consultation', assignee: 'designer', date: '22/15/2026', status: 'Not Started' },
    { id: 3, title: 'UI Design', tag: 'with consultation', assignee: 'Amaya (Ui designer)', date: '5 days more', status: 'Ongoing' },
    { id: 8, title: 'UI Design', tag: 'with consultation', assignee: 'Amaya (Ui designer)', date: '5 days more', status: 'Ongoing' },
    { id: 9, title: 'UI Design', tag: 'with consultation', assignee: 'Amaya (Ui designer)', date: '5 days more', status: 'Ongoing' },
    { id: 4, title: 'UI Design', tag: 'with consultation', assignee: 'Amaya (Ui designer)', date: '25/12/2026', status: 'Finished' },
  ];

  const renderColumn = (title, status, bgColor, dotColor) => {
    const tasks = mockTasks.filter(t => t.status === status);
    return (
      <div className={`assign-column ${bgColor}`}>
        <div className="column-header">
          <div className={`status-dot ${dotColor}`}></div>
          <h2>{title}</h2>
        </div>
        {tasks.map(task => (
          <div key={task.id} className={`assign-card border-${dotColor}`}>
            <h3>{task.title}</h3>
            <p className="task-tag">{task.tag}</p>
            <div className="task-footer">
              <span className="assignee"><div className="assignee-dot"></div> {task.assignee}</span>
              <span className="date">{task.date}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* 1. The Sidebar wrapper */}
      <aside className="sidebar">
        <div className="profile-header">
          <div className="avatar-placeholder"></div>
          <span className="profile-name">BLA BLA</span>
        </div>

        <div className="sidebar-white-card">
          <nav className="nav-menu" style={{ marginTop: '30px' }}>
            <button className="nav-btn" onClick={() => navigate('/dashboard')}>
              <DashboardIcon /> <span>DashBoard</span>
            </button>
            <button className="nav-btn active" onClick={() => navigate('/assign')}>
              <AssignIcon /> <span>Assign</span>
            </button>
            <button className="nav-btn" onClick={() => navigate('/all-works')}>
              <FolderIcon /> <span>All Works</span>
            </button>
          </nav>

          <div className="sidebar-bottom">
            <button className="logout-link" onClick={() => navigate('/')}>Logout</button>
          </div>
        </div>
      </aside>

      {/* 2. The Header & Content wrapper */}
      <div className="main-viewport">
        <header className="top-navbar" style={{ justifyContent: 'space-between', paddingLeft: '40px' }}>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#1a202c' }}>
            21/12/2026
          </div>
          <div className="manager-profile">
            <button style={{ 
              backgroundColor: '#030b2e', color: 'white', padding: '8px 16px', 
              borderRadius: '24px', border: 'none', display: 'flex', alignItems: 'center', 
              gap: '8px', fontWeight: '600', cursor: 'pointer', marginRight: '15px' 
            }}>
              <span style={{ 
                backgroundColor: 'white', color: '#030b2e', borderRadius: '50%', 
                width: '18px', height: '18px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' 
              }}>+</span> Assign
            </button>
            <div className="manager-avatar"></div>
            <div className="manager-info">
              <span className="manager-title" style={{fontWeight: '500'}}>Manager ˅</span>
            </div>
          </div>
        </header>

        {/* 3. The Board */}
        <main className="content-container" style={{ backgroundColor: '#f4f7fc', padding: '20px 30px' }}>
          <div className="assign-board">
            {renderColumn('Not Started', 'Not Started', 'bg-red-light', 'dot-red')}
            {renderColumn('Ongoing', 'Ongoing', 'bg-orange-light', 'dot-orange')}
            {renderColumn('Finished', 'Finished', 'bg-green-light', 'dot-green')}
          </div>
        </main>
      </div>
    </div>
  );
}