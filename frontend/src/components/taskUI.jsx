import React, { useState } from 'react';
import './taskUI.css'; 

const TaskPopup = ({ onClose }) => {
  const [taskStatus, setTaskStatus] = useState('Ongoing');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Started': return '#ef4444'; // Red
      case 'Ongoing': return '#facc15';     // Yellow
      case 'Finished': return '#22c55e';    // Green
      default: return '#ccc';
    }
  };

  return (
    <div className="task-popup-overlay">
      <div className="task-popup-container">
        
        {/* Header */}
        <div className="task-header">
          <h2>Task Name :</h2>
          <h2 className="task-title">UI design</h2>
          <div className="status-dot" style={{ backgroundColor: getStatusColor(taskStatus) }}></div>
        </div>
        <hr className="task-divider" />

        {/* Task Information */}
        <h3 className="info-title">Task information</h3>
        <div className="info-grid">
          {/* Assigned By */}
          <div>
            <div className="info-label">Assigned by:</div>
            <div className="user-block">
              <div className="avatar">
                <svg viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="user-details">
                <p className="user-name">Gotha bataya</p>
                <p className="user-subtext">Assigned on 19/12/2026</p>
              </div>
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <div className="info-label">Assigned to:</div>
            <div className="user-block">
              <div className="avatar">
                <svg viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="user-details">
                <p className="user-name">Moda bataya</p>
                <p className="user-subtext">Designer</p>
              </div>
            </div>
          </div>

          {/* Created On */}
          <div>
            <div className="info-label">Created on:</div>
            <p className="date-text">13/05/2026</p>
          </div>
        </div>

        {/* Key Dates Section */}
        <div className="key-dates-box">
          <div>
            <h4>Key Dates</h4>
            <p className="due-date-text">
              Due Date: <span className="due-date-val">25/12/2026</span> 
              <span className="days-left">( 3 days left )</span>
            </p>
          </div>
          <div className="status-block">
            <span className="status-text">Status:</span>
            <div className="status-small-dot" style={{ backgroundColor: getStatusColor(taskStatus) }}></div>
            <span className="status-text">{taskStatus}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="description-area">
          <h4>Description</h4>
          <p className="desc-text">Design the final pages</p>
        </div>

        {/* Bottom Area: Comments (Left) & Controls (Right) */}
        <div className="bottom-controls-container">
          
          {/* Left Bottom: Comment Box & Add Comment Button */}
          <div className="left-comments">
            <h4>Comments</h4>
            <textarea
              rows="3"
              placeholder="Use pastel colors"
            ></textarea>
            <button className="btn btn-outline add-comment-btn">
              Add comment
            </button>
          </div>

          {/* Right Bottom: Status Selector & Update Button */}
          <div className="right-actions">
            <div className="status-selector-container">
              <div className="status-indicator" style={{ backgroundColor: getStatusColor(taskStatus) }}></div>
              <select 
                value={taskStatus} 
                onChange={(e) => setTaskStatus(e.target.value)} 
                className="status-dropdown"
              >
                <option value="Not Started">Not Started</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Finished">Finished</option>
              </select>
            </div>
            
            <button className="btn btn-solid" onClick={onClose}>
              Update Status
            </button>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default TaskPopup;