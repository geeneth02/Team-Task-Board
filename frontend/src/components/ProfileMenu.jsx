import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css'; // You can style your dropdown here

export default function ProfileMenu({ user, onClose }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear token/session data here if applicable
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-menu-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Profile Header */}
        <div className="profile-menu-header">
          <img 
            src={user.profilePhoto || '/default-avatar.png'} 
            alt="Profile" 
            className="profile-menu-avatar"
          />
          <h3 style={{ margin: '10px 0 0 0' }}>
            {user.firstName} <span style={{ fontWeight: 'normal', fontSize: '14px' }}>({user.role || 'Member'})</span>
          </h3>
        </div>

        {/* Menu Options */}
        <div className="profile-menu-options">
          <button onClick={() => alert('Open Photo Uploader')}>Update Profile Photo</button>
          <button onClick={() => alert('Open Details Form')}>Update Profile Details</button>
          <button onClick={() => alert('Open Role Selector')}>Update Role</button>
          <button onClick={() => alert('Open Password Modal')}>Change Password</button>
        </div>

        <hr style={{ margin: '15px 0', borderColor: '#eee' }} />
        
        <button className="sign-out-btn" onClick={handleSignOut} style={{ color: '#d9534f', fontWeight: 'bold' }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}