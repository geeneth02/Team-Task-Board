import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 
import './Assign.css';    

const DashboardIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/></svg> );
const AssignIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> );
const FolderIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg> );

export default function Assign() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState(null); // Tracks which 3-dot menu is open

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Task Function
  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the task from the screen without reloading the page
        setTasks(tasks.filter(task => task._id !== taskId));
        setOpenMenuId(null);
      } else {
        alert('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Update Task Function (Navigates to AddTask with data)
  const handleUpdate = (task) => {
    navigate('/add-task', { state: { editTask: task } });
  };

  const renderColumn = (title, status, bgColor, dotColor) => {
    const columnTasks = tasks.filter(t => t.status === status);
    
    return (
      <div className={`assign-column ${bgColor}`}>
        <div className="column-header">
          <div className={`status-dot ${dotColor}`}></div>
          <h2>{title}</h2>
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>Loading...</p>
        ) : columnTasks.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#999', fontSize: '13px' }}>No tasks</p>
        ) : (
          columnTasks.map(task => (
            <div key={task._id} className={`assign-card border-${dotColor}`} style={{ position: 'relative' }}>
              
              {/* Header with 3-dot button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3>{task.title}</h3>
                <div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Stops the click from closing the menu instantly
                      setOpenMenuId(openMenuId === task._id ? null : task._id);
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', color: '#666', padding: '0 5px' }}
                  >
                    ⋮
                  </button>
                  
                  {/* Dropdown Menu */}
                  {openMenuId === task._id && (
                    <div 
                      onClick={(e) => e.stopPropagation()} // Protects clicks inside the menu
                      style={{ position: 'absolute', right: '10px', top: '35px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 10, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                    >
                      <button onClick={() => handleUpdate(task)} style={{ padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid #eee', color: '#030b2e' }}>
                        Update
                      </button>
                      <button onClick={() => handleDelete(task._id)} style={{ padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: '#d9534f' }}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="task-tag">{task.description || 'No description'}</p>
              <div className="task-footer">
                <span className="assignee">
                  <div className="assignee-dot"></div> 
                  {task.assignees && task.assignees[0] ? task.assignees[0] : 'Unassigned'}
                </span>
                <span className="date">{task.dueDate || 'No Date'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
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

      <div className="main-viewport">
        <header className="top-navbar" style={{ justifyContent: 'space-between', paddingLeft: '40px' }}>
          <div style={{ fontSize: '15px', fontWeight: '500', color: '#1a202c' }}>
            {new Date().toLocaleDateString('en-GB')}
          </div>
          <div className="manager-profile">
            <button 
              onClick={() => navigate('/add-task')}
              style={{ backgroundColor: '#030b2e', color: 'white', padding: '8px 16px', borderRadius: '24px', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer', marginRight: '15px' }}
            >
              <span style={{ backgroundColor: 'white', color: '#030b2e', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }}>+</span> Assign
            </button>
            <div className="manager-avatar"></div>
            <div className="manager-info">
              <span className="manager-title" style={{fontWeight: '500'}}>Manager ˅</span>
            </div>
          </div>
        </header>

        <main className="content-container" style={{ backgroundColor: '#f4f7fc', padding: '20px 30px' }}>
          {/* Clicking anywhere else on the board closes the menu */}
          <div className="assign-board" onClick={() => setOpenMenuId(null)}>
            {renderColumn('Not Started', 'Not Started', 'bg-red-light', 'dot-red')}
            {renderColumn('Ongoing', 'Ongoing', 'bg-orange-light', 'dot-orange')}
            {renderColumn('Finished', 'Finished', 'bg-green-light', 'dot-green')}
          </div>
        </main>
      </div>
    </div>
  );
}
