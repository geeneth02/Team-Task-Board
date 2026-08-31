import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddTask.css';

const AddTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract task data if we came from the "Update" button
  const editTask = location.state?.editTask;

  const [title, setTitle] = useState(editTask ? editTask.title : '');
  const [description, setDescription] = useState(editTask ? editTask.description : '');
  const [assignee, setAssignee] = useState(editTask && editTask.assignees[0] ? editTask.assignees[0] : '');
  const [startDate, setStartDate] = useState(editTask ? editTask.startDate : '');
  const [dueDate, setDueDate] = useState(editTask ? editTask.dueDate : '');
  const [priority, setPriority] = useState(editTask ? editTask.priority : 'High');
  const [status, setStatus] = useState(editTask ? editTask.status : 'Not Started');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateOrUpdateTask = async () => {
    if (!title || !assignee) {
      alert('Please provide at least a title and an assignee.');
      return;
    }

    setLoading(true);

    // Get the currently logged-in manager's name
    const currentManager = localStorage.getItem('firstName') || localStorage.getItem('userName') || 'Manager';

    try {
      const method = editTask ? 'PUT' : 'POST';
      const url = editTask 
        ? `http://localhost:5000/api/tasks/${editTask._id}` 
        : 'http://localhost:5000/api/tasks';

      // Build payload body
      const payload = {
        title,
        description,
        assignees: [assignee], 
        startDate,
        dueDate,
        priority,
        status
      };

      // If creating a new task, tag it with the creator's name
      if (!editTask) {
        payload.createdBy = currentManager;
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save task');

      navigate('/assign');
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Cannot connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-card" style={{ minWidth: '550px' }}>
        <h2 className="form-title">{editTask ? 'Update Task' : 'Add New Task / Assignee'}</h2>

        <div className="form-group">
          <label>Task Title</label>
          <input 
            type="text" 
            className="form-input text-input" 
            placeholder="e.g., UI Design" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description (Tag)</label>
          <input 
            type="text" 
            className="form-input text-input" 
            placeholder="e.g., with consultation" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Assign To</label>
          <select 
            className="form-input custom-select"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value="">Select a team member...</option>
            {users.map(user => (
              <option key={user._id} value={user.firstName}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>Start Date</label>
            <div className="date-input-wrapper">
              <input type="date" className="form-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
          </div>
          <div className="form-group half-width">
            <label>Due Date</label>
            <div className="date-input-wrapper">
              <input type="date" className="form-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>Priority</label>
            <div className="priority-chips">
              {['High', 'Medium', 'Low'].map(level => (
                <button
                  key={level}
                  type="button"
                  className={`chip ${priority === level ? 'active' : ''}`}
                  onClick={() => setPriority(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          {editTask && (
            <div className="form-group half-width">
              <label>Column Status</label>
              <select className="form-input custom-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Not Started</option>
                <option>Ongoing</option>
                <option>Finished</option>
              </select>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={handleCreateOrUpdateTask} disabled={loading}>
            {loading ? 'Saving...' : (editTask ? 'Update Task' : '+ Create & Assign')}
          </button>
          <button className="btn-secondary" onClick={() => navigate('/assign')}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;