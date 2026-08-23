import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTask.css';

const AddTask = () => {
  const [priority, setPriority] = useState('High');
  const navigate = useNavigate(); // Initialize the hook

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2 className="form-title">Add New Task / Assignee</h2>

        {/* Task Title */}
        <div className="form-group">
          <label>Task Title</label>
          <select className="form-input custom-select">
            <option>UI Design</option>
            <option>Backend Development</option>
            <option>Market Research</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <input type="text" className="form-input text-input" placeholder="Description..." />
        </div>

        {/* Assign To */}
        <div className="form-group">
          <label>Assign To</label>
          <div className="form-input mock-multi-select">
            <div className="tags-container">
              <span className="assignee-tag">
                <span className="avatar">👩🏽</span> Amaya (UI) <span className="close-x">✕</span>
              </span>
              <span className="assignee-tag">
                <span className="avatar">👨🏻</span> Ravindu (PM) <span className="close-x">✕</span>
              </span>
            </div>
            <span className="dropdown-arrow">⌄</span>
          </div>
        </div>

        {/* Dates Row */}
        <div className="form-row">
          <div className="form-group half-width">
            <label>Start Date</label>
            <div className="date-input-wrapper">
              <input type="text" className="form-input" defaultValue="22/12/2026" />
              <span className="calendar-icon">📅</span>
            </div>
          </div>
          <div className="form-group half-width">
            <label>Due Date</label>
            <div className="date-input-wrapper">
              <input type="text" className="form-input" defaultValue="22/12/2026" />
              <span className="calendar-icon">📅</span>
            </div>
          </div>
        </div>

        {/* Priority & Status Row */}
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
          <div className="form-group half-width">
            <label>Column Status</label>
            <select className="form-input custom-select">
              <option>Not Started</option>
              <option>Ongoing</option>
              <option>Finished</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button 
            className="btn-primary" 
            onClick={() => {
              console.log('Task created!');
              navigate('/assign'); // Added navigation here
            }}
          >
            + Create & Assign
          </button>
          <button className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;