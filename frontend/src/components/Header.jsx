import React from 'react';

export default function Header() {
  return (
    <div className="top-header">
      <div className="header-actions">
        <div className="bell-icon">🔔</div>
        <div className="avatar-small"></div>
        <div style={{ fontWeight: '500', cursor: 'pointer' }}>
          Manager ⌄
        </div>
      </div>
    </div>
  );
}