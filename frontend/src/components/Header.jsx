import React from 'react';

export default function Header() {
  const BellIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  );

  return (
    <div className="top-header">
      <div className="header-actions">
        <div className="bell-icon">
          <BellIcon />
        </div>
        <div className="avatar-small"></div>
        <div style={{ fontWeight: '500', cursor: 'pointer' }}>
          Manager ⌄
        </div>
      </div>
    </div>
  );
}