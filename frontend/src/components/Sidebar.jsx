import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const GridIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>);
  const UserIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
  const FolderIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="avatar-large"></div>
        <h4>BLA BLA</h4>
      </div>
      
      <div className="sidebar-menu-container">
        {/* Swapped to a nav container to avoid list item spacing issues */}
        <nav className="menu-list">
          <NavLink to="/dashboard" className={({isActive}) => isActive ? "menu-item active" : "menu-item"}>
            <GridIcon /> Dashboard
          </NavLink>
          
          <NavLink to="/assign" className={({isActive}) => isActive ? "menu-item active" : "menu-item"}>
            <UserIcon /> Assign
          </NavLink>
          
          <NavLink to="/works" className={({isActive}) => isActive ? "menu-item active" : "menu-item"}>
            <FolderIcon /> All Works
          </NavLink>
        </nav>
      </div>
    </div>
  );
}