import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'; // <-- 1. Import socket client
import NotificationsPanel from './NotificationsPanel'; 
import ProfileMenu from './ProfileMenu'; 

const socket = io('http://localhost:5000'); // <-- Connect to socket server

// --- TASK POPUP COMPONENT ---
function TaskPopup({ onClose, task, onRefresh }) {
  const [newStatus, setNewStatus] = useState(task?.rawStatus || 'Not Started');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!task) return null;

  const UserSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#2b4c7e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const getStatusColor = (statusText) => {
    if (statusText === 'Not Started') return '#d92d20';
    if (statusText === 'Ongoing') return '#f79009';
    if (statusText === 'Finished') return '#73e23d';
    return '#facc15';
  };
  
  const dotColor = getStatusColor(newStatus);

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedTaskData = await response.json();
        
        // <-- 2. Emit socket event so assigner's screen updates live
        socket.emit('taskUpdated', updatedTaskData);

        onRefresh(); 
        onClose(); 
      } else {
        alert('Failed to update task status in the database.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Could not connect to the server.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <style>{`
        .popup-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .popup-container { background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); width: 100%; max-width: 650px; padding: 30px; position: relative; }
        .popup-header { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
        .popup-header h2 { margin: 0; font-size: 22px; font-weight: 500; color: #333; }
        .popup-header h2.title-blue { color: #2b4c7e; font-weight: 600; }
        .status-dot-large { width: 18px; height: 18px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 1px #e5e7eb; transition: background-color 0.3s; }
        .popup-divider { border: 0; border-top: 1px solid #e5e7eb; margin-bottom: 20px; }
        .section-heading { font-size: 16px; color: #333; font-weight: 600; margin-bottom: 15px; }
        .info-grid { display: grid; grid-template-columns: 1.5fr 1.5fr 1fr; gap: 20px; margin-bottom: 25px; }
        .info-label { font-size: 12px; color: #333; margin-bottom: 8px; }
        .user-block { display: flex; align-items: center; gap: 10px; }
        .avatar-circle { width: 40px; height: 40px; background-color: #f3f4f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .user-name { font-weight: 600; color: #111; font-size: 13px; }
        .user-subtext { font-size: 11px; color: #666; margin-top: 2px; }
        .date-text { font-weight: 500; color: #111; font-size: 14px; margin-top: 8px; }
        .key-dates-box { background-color: #f3f4f6; border-radius: 8px; padding: 15px 20px; margin-bottom: 25px; }
        .key-dates-title { font-size: 14px; font-weight: 600; color: #333; margin-bottom: 10px; }
        .key-dates-row { display: flex; justify-content: space-between; align-items: center; }
        .due-date-text { font-size: 14px; color: #333; }
        .due-date-val { color: #dc2626; font-weight: 600; margin: 0 4px; }
        .status-block { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #333; }
        .status-dot-small { width: 12px; height: 12px; border-radius: 50%; transition: background-color 0.3s; }
        .status-select { border: 1px solid #d1d5db; border-radius: 6px; padding: 4px 8px; font-size: 13px; outline: none; cursor: pointer; color: #333; font-weight: 500; }
        .status-select:focus { border-color: #2b4c7e; }
        .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 20px; }
        .desc-text { font-size: 13px; color: #333; line-height: 1.5; }
        .comments-textarea { width: 100%; border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; font-size: 13px; resize: none; outline: none; box-sizing: border-box; min-height: 80px; }
        .comments-textarea:focus { border-color: #2b4c7e; }
        .action-buttons { display: flex; justify-content: flex-end; gap: 15px; }
        .btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .btn-outline { background-color: white; border: 1px solid #d1d5db; color: #333; }
        .btn-outline:hover { background-color: #f9fafb; }
        .btn-solid { background-color: #0a192f; border: 1px solid #0a192f; color: white; }
        .btn-solid:hover { background-color: #112240; }
        .btn-solid:disabled { background-color: #6b7280; border-color: #6b7280; cursor: not-allowed; }
      `}</style>

      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-container" onClick={e => e.stopPropagation()}>
          <div className="popup-header">
            <h2>Task Name :</h2>
            <h2 className="title-blue">{task.title}</h2>
            <div className="status-dot-large" style={{ backgroundColor: dotColor }}></div>
          </div>
          <hr className="popup-divider" />

          <div className="section-heading">Task information</div>
          <div className="info-grid">
            <div>
              <div className="info-label">Assigned by:</div>
              <div className="user-block">
                <div className="avatar-circle"><UserSvg /></div>
                <div>
                  <div className="user-name">Manager</div>
                  <div className="user-subtext">System Administrator</div>
                </div>
              </div>
            </div>
            <div>
              <div className="info-label">Assigned to:</div>
              <div className="user-block">
                <div className="avatar-circle"><UserSvg /></div>
                <div>
                  <div className="user-name">{task.assignee || 'Unassigned'}</div>
                  <div className="user-subtext">Team Member</div>
                </div>
              </div>
            </div>
            <div>
              <div className="info-label">Created on:</div>
              <div className="date-text">
                {task.createdAt ? new Date(task.createdAt).toLocaleDateString('en-GB') : 'Recently'}
              </div>
            </div>
          </div>

          <div className="key-dates-box">
            <div className="key-dates-title">Key Dates</div>
            <div className="key-dates-row">
              <div className="due-date-text">
                Due Date: <span className="due-date-val">{task.dueDate || 'No Date Set'}</span> 
              </div>
              <div className="status-block">
                <span>Status:</span>
                <div className="status-dot-small" style={{ backgroundColor: dotColor }}></div>
                <select 
                  className="status-select" 
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Finished">Finished</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bottom-grid">
            <div>
              <div className="section-heading" style={{ marginBottom: '8px' }}>Description</div>
              <div className="desc-text">{task.subtitle || 'No description provided.'}</div>
            </div>
            <div>
              <div className="section-heading" style={{ marginBottom: '8px' }}>Comments</div>
              <textarea className="comments-textarea" placeholder="Add notes..."></textarea>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn btn-outline" onClick={onClose} disabled={isUpdating}>Close</button>
            <button className="btn btn-solid" onClick={handleUpdateStatus} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// --- MAIN ALLWORKS COMPONENT ---
export default function Allworks() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userRole, setUserRole] = useState('Member');
  const [userId, setUserId] = useState('');
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem('firstName') || localStorage.getItem('userName');
    if (storedName) setUserName(storedName);

    const storedRole = localStorage.getItem('userRole');
    if (storedRole) setUserRole(storedRole);

    const storedId = localStorage.getItem('userId');
    if (storedId) setUserId(storedId);
  }, []);

  const loggedInUser = {
    _id: userId,
    firstName: userName,
    role: userRole,
    profilePhoto: ''
  };

  const fetchMyTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();

      const currentUser = localStorage.getItem('firstName');
      
      const myTasks = data
        .filter(task => task.assignees && task.assignees.includes(currentUser))
        .map(task => {
          let uiType = 'todo';
          if (task.status === 'Ongoing') uiType = 'progress';
          if (task.status === 'Finished') uiType = 'done';

          return {
            id: task._id,
            title: task.title,
            subtitle: task.description,
            assignee: task.assignees[0],
            type: uiType,
            dueDate: task.dueDate,
            createdAt: task.createdAt,
            rawStatus: task.status
          };
        });

      setTasks(myTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();

    // <-- 3. Listen for socket updates in All Works too
    socket.on('taskUpdateReceived', () => {
      fetchMyTasks();
    });

    return () => {
      socket.off('taskUpdateReceived');
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('firstName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };

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
    { id: 'todo', label: 'To-do', activeColor: '#d92d20', inactiveColor: '#d92d20', badgeBg: '#d92d20' },
    { id: 'progress', label: 'In-progress', activeColor: '#f79009', inactiveColor: '#f79009', badgeBg: '#f79009' },
    { id: 'done', label: 'Done', activeColor: '#73e23d', inactiveColor: '#73e23d', badgeBg: '#73e23d' }
  ];

  const GridIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/></svg>);
  const UserIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
  const FolderIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>);
  const BellIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a202c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        body { margin: 0; padding: 0; }
        .app-layout { display: flex; height: 100vh; width: 100vw; overflow: hidden; background-color: #030b2e; }
        .sidebar { width: 240px; display: flex; flex-direction: column; background-color: #030b2e; flex-shrink: 0; }
        .profile-header { display: flex; align-items: center; gap: 16px; padding: 24px 20px; }
        .avatar-placeholder { width: 48px; height: 48px; background-color: #d9d9d9; border-radius: 50%; }
        .profile-name { color: #ffffff; font-weight: 700; font-size: 15px; }
        .sidebar-white-card { flex: 1; background-color: #ffffff; border-top-right-radius: 40px; display: flex; flex-direction: column; padding: 24px 18px; margin-right: 15px; }
        .nav-menu { display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .nav-btn { display: flex; align-items: center; gap: 14px; padding: 12px 18px; border-radius: 12px; border: none; background: transparent; color: #1a202c; font-size: 14px; font-weight: 600; cursor: pointer; text-align: left; transition: all 0.2s; }
        .nav-btn.active { background-color: #030b2e; color: #ffffff; }
        .sidebar-bottom { padding-bottom: 10px; }
        .logout-link { background: none; border: none; color: #e53e3e; font-size: 15px; font-weight: 700; cursor: pointer; padding-left: 8px; }
        
        .main-content { flex: 1; display: flex; flex-direction: column; background-color: #ffffff; }
        .top-navbar { height: 70px; background-color: #ffffff; display: flex; justify-content: flex-end; align-items: center; padding-right: 40px; flex-shrink: 0; }
        .manager-profile { display: flex; align-items: center; gap: 12px; }
        .manager-avatar { width: 40px; height: 40px; background-color: #d9d9d9; border-radius: 50%; }
        .manager-info { display: flex; flex-direction: column; align-items: flex-end; }
        .manager-title { font-size: 14px; font-weight: 700; color: #1a202c; }
        .manager-date { font-size: 11px; color: #718096; }

        .board-wrapper { flex: 1; display: flex; flex-direction: column; padding: 0 30px 30px 0; }
        .tabs-bar { background-color: #0B1941; border-radius: 12px 12px 0 0; height: 60px; display: flex; align-items: flex-end; padding-left: 30px; gap: 25px; }
        .tab-active { padding: 8px 30px 12px 30px; font-weight: bold; display: flex; align-items: center; gap: 8px; margin-bottom: -1px; position: relative; cursor: pointer; z-index: 2; }
        .tab-active::before { content: ''; position: absolute; top: -10px; right: -10px; bottom: 0; left: -10px; background-color: #f8f9fa; transform: perspective(80px) rotateX(25deg); transform-origin: bottom; border-radius: 12px 12px 0 0; z-index: -1; }
        .tab-inactive { background-color: white; border-radius: 20px; padding: 6px 16px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; cursor: pointer; }
        .badge { color: white; border-radius: 50%; width: 22px; height: 22px; display: flex; justify-content: center; align-items: center; font-size: 12px; }
        .board-grid { background-color: #f8f9fa; flex: 1; border-radius: 0 0 12px 12px; padding: 30px; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 25px; align-content: flex-start; overflow-y: auto; }
        .card { background: white; border-radius: 12px; padding: 18px 20px; min-height: 120px; display: flex; flex-direction: column; cursor: pointer; border-left: 6px solid; box-shadow: 0 2px 4px rgba(0,0,0,0.02); transition: transform 0.2s ease; }
        .card:hover { transform: translateY(-2px); }
        .card h3 { margin: 0 0 4px 0; font-size: 18px; font-weight: 500; color: #1a202c; }
        .task-tag { margin: 0 0 20px 0; font-size: 12px; color: #718096; }
        .task-footer { display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-top: auto; }
        .assignee { display: flex; align-items: center; gap: 8px; color: #1a202c; font-weight: 500; }
        .assignee-dot { width: 14px; height: 14px; border-radius: 50%; background-color: #cbd5e0; }
      `}</style>

      {selectedTask && (
        <TaskPopup 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onRefresh={fetchMyTasks} 
        />
      )}

      {showProfileMenu && (
        <ProfileMenu 
          user={loggedInUser} 
          onClose={() => setShowProfileMenu(false)} 
        />
      )}

      <div className="app-layout">
        <aside className="sidebar">
          <div className="profile-header">
            <div className="avatar-placeholder"></div>
            <span className="profile-name">ABC Holdings</span>
          </div>
          
          <div className="sidebar-white-card">
            <nav className="nav-menu" style={{ marginTop: '30px' }}>
              <button className="nav-btn" onClick={() => navigate('/dashboard')}>
                <GridIcon />
                <span>DashBoard</span>
              </button>
              <button className="nav-btn" onClick={() => navigate('/assign')}>
                <UserIcon />
                <span>Assign</span>
              </button>
              <button className="nav-btn active">
                <FolderIcon />
                <span>All Works</span>
              </button>
            </nav>
            
            <div className="sidebar-bottom">
              <button className="logout-link" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </aside>

        <div className="main-content">
          <header className="top-navbar" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
              >
                <BellIcon />
                <span style={{ position: 'absolute', top: '0px', right: '2px', width: '8px', height: '8px', backgroundColor: '#e53e3e', borderRadius: '50%' }}></span>
              </button>

              <div 
                className="manager-profile"
                onClick={() => setShowProfileMenu(true)}
                style={{ cursor: 'pointer' }}
              >
                <div className="manager-avatar"></div>
                <div className="manager-info">
                  <span className="manager-title">{loggedInUser.firstName} ˅</span>
                  <span className="manager-date">{new Date().toLocaleDateString('en-GB')}</span>
                </div>
              </div>
            </div>

            {showNotifications && <NotificationsPanel />}
          </header>

          <div className="board-wrapper">
            <div className="tabs-bar">
              {tabConfigs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <div 
                    key={tab.id}
                    className={isActive ? "tab-active" : "tab-inactive"} 
                    style={{ color: isActive ? tab.activeColor : tab.inactiveColor, border: isActive ? 'none' : `1px solid ${tab.inactiveColor}` }}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label} <span className="badge" style={{ backgroundColor: tab.badgeBg }}>{counts[tab.id]}</span>
                  </div>
                );
              })}
            </div>

            <div className="board-grid">
              {loading ? (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666' }}>Loading your tasks...</p>
              ) : filteredTasks.length === 0 ? (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#999' }}>No tasks found for you in this category.</p>
              ) : (
                filteredTasks.map(task => {
                  const borderColor = {
                    'todo': '#d92d20',
                    'progress': '#f79009',
                    'done': '#73e23d'
                  }[task.type] || '#d92d20';

                  return (
                    <div 
                      key={task.id} 
                      className="card" 
                      style={{ borderLeftColor: borderColor }}
                      onClick={() => setSelectedTask(task)} 
                    >
                      <h3>{task.title}</h3>
                      {task.subtitle && <p className="task-tag">{task.subtitle}</p>}
                      
                      {task.assignee && (
                        <div className="task-footer">
                          <span className="assignee">
                            <div className="assignee-dot"></div> 
                            {task.assignee}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', paddingTop: '15px', fontSize: '13px', fontWeight: '500' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#d92d20' }}></div> To - do</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f79009' }}></div> In - Progress</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#73e23d' }}></div> Finished</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}