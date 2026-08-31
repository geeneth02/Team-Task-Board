import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsPanel from './NotificationsPanel'; 
import TaskPopup from './taskUI'; 
import ProfileMenu from './ProfileMenu'; 
import './Dashboard.css';

const DashboardIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/></svg> );
const AssignIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> );
const FolderIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg> );
const BellIcon = () => ( <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a202c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> );

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('myWork');
  const [showNotifications, setShowNotifications] = useState(false); 
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false); 
  
  // State to hold data from local storage
  const [userName, setUserName] = useState('User');
  const [userRole, setUserRole] = useState('Member'); 
  const [userId, setUserId] = useState('');

  // States for fetching assigned tasks and opening the interactive details modal
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);

    const storedRole = localStorage.getItem('userRole');
    if (storedRole) setUserRole(storedRole);

    const storedId = localStorage.getItem('userId');
    if (storedId) setUserId(storedId);

    fetchAssignedTasks();
  }, []);

  const fetchAssignedTasks = async () => {
    try {
      setLoadingTasks(true);
      const response = await fetch('http://localhost:5000/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();

      const today = new Date();
      const recentTasks = data.filter(task => {
        if (!task.createdAt) return false;
        
        const taskDate = new Date(task.createdAt);
        const isToday = taskDate.getDate() === today.getDate() &&
                        taskDate.getMonth() === today.getMonth() &&
                        taskDate.getFullYear() === today.getFullYear();

        return isToday;
      });

      setAssignedTasks(recentTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAssignedTasks(assignedTasks.filter(task => task._id !== taskId));
        setSelectedTask(null); 
      } else {
        alert('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = (task) => {
    navigate('/add-task', { state: { editTask: task } });
  };

  const loggedInUser = {
    _id: userId, 
    firstName: userName, 
    role: userRole,
    profilePhoto: '' 
  };

  const tasks = [
    { id: 1, title: 'UI Design', sub: 'with consultation', assignee: 'Amaya (Ui designer)', date: '22/15/2026', status: 'red' },
    { id: 2, title: 'Backend code', sub: 'with consultation', assignee: 'Anush', date: '22/15/2026', status: 'green' }
  ];

  const placeholders = Array.from({ length: 10 });

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId'); 
    localStorage.removeItem('token');
    navigate('/');
  };

  const getStatusColor = (status) => {
    if (status === 'Finished') return 'green';
    if (status === 'Ongoing') return 'orange';
    return 'red'; 
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="profile-header">
          <div className="avatar-placeholder"></div>
          <span className="profile-name">ABC Company</span>
        </div>

        <div className="sidebar-white-card">
          <nav className="nav-menu">
            <button className="nav-btn active"><DashboardIcon /><span>DashBoard</span></button>
            <button className="nav-btn" onClick={() => navigate('/assign')}><AssignIcon /><span>Assign</span></button>
            <button className="nav-btn" onClick={() => navigate('/all-works')}><FolderIcon /><span>All Works</span></button>
          </nav>

          <div className="sidebar-bottom">
            <button className="logout-link" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="main-viewport">
        {/* Updated Top Header Bar matching Assign Screen */}
        <header className="top-navbar" style={{ position: 'relative', justifyContent: 'space-between', paddingLeft: '40px' }}>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#1a202c' }}>
            {new Date().toLocaleDateString('en-GB')}
          </div>

          <div className="manager-profile" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', marginRight: '5px' }}
            >
              <BellIcon />
              <span style={{ position: 'absolute', top: '0px', right: '2px', width: '8px', height: '8px', backgroundColor: '#e53e3e', borderRadius: '50%' }}></span>
            </button>

            <button 
              onClick={() => navigate('/add-task')}
              style={{ backgroundColor: '#030b2e', color: 'white', padding: '8px 16px', borderRadius: '24px', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer', marginRight: '10px' }}
            >
              <span style={{ backgroundColor: 'white', color: '#030b2e', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }}>+</span> Assign
            </button>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
              onClick={() => setShowProfileMenu(true)}
            >
              <div className="manager-avatar"></div>
              <div className="manager-info">
                <span className="manager-title" style={{ fontWeight: '500' }}>{loggedInUser.firstName || 'Manager'} ˅</span>
              </div>
            </div>
          </div>

          {showNotifications && <NotificationsPanel />}
        </header>

        <main className="content-container">
          <div className="tab-header">
            <button className={`tab-link ${activeTab === 'myWork' ? 'active' : ''}`} onClick={() => setActiveTab('myWork')}>My work</button>
            <button className={`tab-link ${activeTab === 'assignedWork' ? 'active' : ''}`} onClick={() => setActiveTab('assignedWork')}>Assigned work</button>
          </div>

          <div className="grid-canvas">
            {activeTab === 'myWork' && (
              <>
                {tasks.map((task) => (
                  <div className="task-card" key={task.id} onClick={() => setShowTaskPopup(true)} style={{ cursor: 'pointer' }}>
                    <div className={`accent-bar ${task.status}`}></div>
                    <div className="task-content">
                      <h3 className="task-title">{task.title}</h3>
                      <span className="task-subtext">{task.sub}</span>
                      <div className="assignee-tag"><span className="grey-dot"></span><span className="assignee-text">{task.assignee}</span></div>
                      <span className="date-text">{task.date}</span>
                    </div>
                  </div>
                ))}
                {placeholders.map((_, i) => <div className="task-card placeholder" key={i}></div>)}
              </>
            )}
            
            {activeTab === 'assignedWork' && (
              <>
                {loadingTasks ? (
                  <div className="empty-view">Loading assigned tasks...</div>
                ) : assignedTasks.length > 0 ? (
                  assignedTasks.map((task) => (
                    <div 
                      className="task-card" 
                      key={task._id} 
<<<<<<< HEAD
                      onClick={() => setSelectedTask(task)} // Opens the interactive popup modal!
=======
                      onClick={() => setSelectedTask(task)}
>>>>>>> 1536209 (Update dashboard header layout to match assign screen)
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={`accent-bar ${getStatusColor(task.status)}`}></div>
                      <div className="task-content">
                        <h3 className="task-title">{task.title}</h3>
                        <span className="task-subtext">{task.description || 'No description'}</span>
                        <div className="assignee-tag">
                          <span className="grey-dot"></span>
                          <span className="assignee-text">
                            {task.assignees && task.assignees[0] ? task.assignees[0] : 'Unassigned'}
                          </span>
                        </div>
                        <span className="date-text">{task.dueDate || 'No Date'}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-view">No assigned work available for today</div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* INTERACTIVE TASK DETAILS POPUP MODAL */}
      {selectedTask && (
        <div 
          onClick={() => setSelectedTask(null)} 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(3, 11, 46, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: 'white', padding: '35px', borderRadius: '16px', width: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', borderTop: '6px solid #030b2e' }}
          >
            <button 
              onClick={() => setSelectedTask(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', color: '#a0aec0', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✕
            </button>

            <h2 style={{ marginTop: 0, color: '#030b2e', fontSize: '24px', fontWeight: '600', paddingRight: '30px' }}>
              {selectedTask.title}
            </h2>

            <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</span>
                <p style={{ margin: '6px 0 0 0', color: '#2d3748', fontSize: '14px', lineHeight: '1.5' }}>
                  {selectedTask.description || 'No description provided for this task.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase' }}>Status</span>
                  <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '14px', color: '#1a202c' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: selectedTask.status === 'Finished' ? '#73e23d' : selectedTask.status === 'Ongoing' ? '#f79009' : '#d92d20' }}></span>
                    {selectedTask.status}
                  </div>
                </div>

                <div style={{ flex: 1, backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase' }}>Priority</span>
                  <div style={{ marginTop: '4px', fontWeight: '600', fontSize: '14px', color: selectedTask.priority === 'High' ? '#e53e3e' : '#3182ce' }}>
                    {selectedTask.priority || 'Medium'}
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase' }}>Assigned Team Members</span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {selectedTask.assignees && selectedTask.assignees.length > 0 ? (
                    selectedTask.assignees.map((person, idx) => (
                      <span key={idx} style={{ backgroundColor: '#030b2e', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#73e23d' }}></span>
                        {person}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: '#a0aec0', fontSize: '13px' }}>Unassigned</span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#4a5568' }}>
                <span><strong>Start Date:</strong> {selectedTask.startDate || 'Not set'}</span>
                <span><strong>Due Date:</strong> {selectedTask.dueDate || 'Not set'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', borderTop: '1px solid #edf2f7', paddingTop: '15px' }}>
              <button 
                onClick={() => handleDelete(selectedTask._id)}
                style={{ backgroundColor: '#fff5f5', color: '#e53e3e', border: '1px solid #feb2b2', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
              >
                Delete Task
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleUpdate(selectedTask)}
                  style={{ backgroundColor: '#edf2f7', color: '#2d3748', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                >
                  Edit Task
                </button>
                <button 
                  onClick={() => setSelectedTask(null)}
                  style={{ backgroundColor: '#030b2e', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render popups conditionally */}
      {showTaskPopup && <TaskPopup onClose={() => setShowTaskPopup(false)} />}
      
      {/* Profile Menu Popup */}
      {showProfileMenu && (
        <ProfileMenu 
          user={loggedInUser} 
          onClose={() => setShowProfileMenu(false)} 
        />
      )}
    </div>
  );
}