import React from 'react';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="avatar-large"></div>
        <h4>BLA BLA</h4>
      </div>
      
      <div className="sidebar-menu-container">
        <ul className="menu-list">
          <li className="menu-item">
            <span>⚏</span> Dashboard
          </li>
          <li className="menu-item">
            <span>👤</span> Assign
          </li>
          <li className="menu-item active">
            <span>📁</span> All Works
          </li>
        </ul>
      </div>
    </div>
  );
}