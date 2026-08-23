import React from 'react';
import './NotificationsPanel.css';

const NotificationsPanel = () => {
  // Mock data structure to prepare for your API integration
  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'CRITICAL: Task Overdue!',
      taskName: 'Backend code (Amaya, Anush)',
      dueDate: '22/12/2026',
      timeElapsed: '1 day',
      isExpanded: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'WARNING: Task Deadline in 2 days',
      taskName: 'UI Design',
      dueDate: '22/12/2026',
      timeElapsed: '1 day',
      dateBottom: '23/12/2026',
      isExpanded: false
    },
    {
      id: 3,
      type: 'info',
      title: 'General Notification in 2 hours',
      taskName: 'Original Due Date fill in 2 days',
      dueDate: '25/12/2026',
      timeElapsed: '',
      dateBottom: '',
      isExpanded: false
    }
  ];

  return (
    <div className="notifications-container">
      <h3 className="notifications-header">Notifications (5 new)</h3>
      
      <div className="notifications-scroll-area">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`notification-card ${notif.type} ${notif.isExpanded ? 'expanded' : 'collapsed'}`}
          >
            {/* Notification Header / Alert Bar */}
            <div className="notification-title-bar">
              <span className="icon">
                {/* The typo was fixed on the line below */}
                {notif.type === 'critical' && '!'}
                {notif.type === 'warning' && '!'}
                {notif.type === 'info' && 'i'}
              </span>
              <span className="title-text">{notif.title}</span>
            </div>

            {/* Notification Body */}
            <div className="notification-body">
              {!notif.isExpanded && notif.type === 'warning' && (
                 <h4 className="collapsed-task-name">{notif.taskName}</h4>
              )}
              
              <p className="notif-detail">
                {notif.isExpanded ? 'Task: ' : 'Task: '} 
                {notif.type === 'critical' ? notif.taskName : 'Backend code (Amaya, Anush)'}
              </p>
              <p className="notif-detail">Original Due Date: {notif.dueDate}</p>
              
              {notif.timeElapsed && (
                <p className="notif-detail">Time Elapsed: {notif.timeElapsed}</p>
              )}

              {notif.dateBottom && (
                <span className="bottom-right-date">{notif.dateBottom}</span>
              )}

              {/* Action Buttons (Only visible on expanded critical tasks) */}
              {notif.isExpanded && (
                <div className="notification-actions">
                  <button className="btn-dark">View Task</button>
                  <button className="btn-light">Mark as Read</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;