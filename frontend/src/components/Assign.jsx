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
  const [openMenuId, setOpenMenuId] = useState(null); 
  const [selectedTask, setSelectedTask] = useState(null); 

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

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== taskId));
        setOpenMenuId(null);
        setSelectedTask(null); // Close modal if open
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
            <div 
              key={task._id} 
              className={`assign-card border-${dotColor}`} 
              style={{ position: 'relative', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
              onClick={() => setSelectedTask(task)} 
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3>{task.title}</h3>
                <div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setOpenMenuId(openMenuId === task._id ? null : task._id);
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', color: '#666', padding: '0 5px' }}
                  >
                    ⋮
                  </button>
                  
                  {openMenuId === task._id && (
                    <div 
                      onClick={(e) => e.stopPropagation()} 
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
          <div className="assign-board" onClick={() => setOpenMenuId(null)}>
            {renderColumn('Not Started', 'Not Started', 'bg-red-light', 'dot-red')}
            {renderColumn('Ongoing', 'Ongoing', 'bg-orange-light', 'dot-orange')}
            {renderColumn('Finished', 'Finished', 'bg-green-light', 'dot-green')}
          </div>
        </main>
      </div>

      {/* INTERACTIVE & STYLED TASK DETAILS MODAL */}
      {selectedTask && (
        <div 
          onClick={() => setSelectedTask(null)} 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(3, 11, 46, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, animation: 'fadeIn 0.2s ease-in-out' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: 'white', padding: '35px', borderRadius: '16px', width: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', borderTop: '6px solid #030b2e' }}
          >
            {/* Close 'X' Button */}
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
              {/* Description Box */}
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</span>
                <p style={{ margin: '6px 0 0 0', color: '#2d3748', fontSize: '14px', lineHeight: '1.5' }}>
                  {selectedTask.description || 'No description provided for this task.'}
                </p>
              </div>

              {/* Status & Priority Row */}
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

              {/* Assignees Section */}
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

              {/* Timelines Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#4a5568' }}>
                <span><strong>Start Date:</strong> {selectedTask.startDate || 'Not set'}</span>
                <span><strong>Due Date:</strong> {selectedTask.dueDate || 'Not set'}</span>
              </div>
            </div>

            {/* Action Buttons Footer */}
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
    </div>
  );
}