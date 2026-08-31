import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileMenu.css'; 

export default function ProfileMenu({ user, onClose }) {
  const navigate = useNavigate();
  
  // Tracks which form is open: null, 'photo', 'details', 'role', 'password'
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form States
  const [photoUrl, setPhotoUrl] = useState(user.profilePhoto || '');
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [role, setRole] = useState(user.role || 'Member');
  const [newPassword, setNewPassword] = useState('');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Dynamic function to handle all updates
  const handleUpdate = async (type) => {
    if (!user._id) {
      alert("Error: User ID is missing. Ensure your login sets the user._id!");
      return;
    }

    setLoading(true);
    try {
      let bodyData = {};
      let url = `http://localhost:5000/api/auth/profile/${user._id}`;

      // Map the correct data based on which form is open
      if (type === 'photo') bodyData = { profilePhoto: photoUrl };
      if (type === 'details') bodyData = { firstName, lastName };
      if (type === 'role') bodyData = { role };
      if (type === 'password') {
        url = `http://localhost:5000/api/auth/password/${user._id}`;
        bodyData = { newPassword };
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      if (response.ok) {
        alert('Update successful! (Refresh to see changes)');
        setActiveModal(null); // Close the form
      } else {
        const err = await response.json();
        alert(`Failed to update: ${err.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Cannot connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  // If a modal is active, render the form overlay instead of the dropdown
  if (activeModal) {
    return (
      <div className="profile-modal-overlay" onClick={() => setActiveModal(null)}>
        <div className="update-form-container" onClick={(e) => e.stopPropagation()}>
          <h2 style={{ marginTop: 0, color: '#030b2e' }}>
            {activeModal === 'photo' && 'Update Profile Photo'}
            {activeModal === 'details' && 'Update Details'}
            {activeModal === 'role' && 'Update Role'}
            {activeModal === 'password' && 'Change Password'}
          </h2>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            {activeModal === 'photo' && (
              <>
                <label>Image URL</label>
                <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." className="form-input" />
              </>
            )}
            
            {activeModal === 'details' && (
              <>
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-input" style={{ marginBottom: '10px' }} />
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-input" />
              </>
            )}

            {activeModal === 'role' && (
              <>
                <label>Select Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="form-input">
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Member">Member</option>
                </select>
              </>
            )}

            {activeModal === 'password' && (
              <>
                <label>New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-input" />
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button>
            <button className="btn-primary" onClick={() => handleUpdate(activeModal)} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the standard dropdown menu
  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-menu-container" onClick={(e) => e.stopPropagation()}>
        <div className="profile-menu-header">
          <img src={user.profilePhoto || 'https://via.placeholder.com/50'} alt="Profile" className="profile-menu-avatar" />
          <h3 style={{ margin: '10px 0 0 0' }}>
            {user.firstName} <span style={{ fontWeight: 'normal', fontSize: '14px' }}>({user.role || 'Member'})</span>
          </h3>
        </div>

        <div className="profile-menu-options">
          <button onClick={() => setActiveModal('photo')}>Update Profile Photo</button>
          <button onClick={() => setActiveModal('details')}>Update Profile Details</button>
          <button onClick={() => setActiveModal('role')}>Update Role</button>
          <button onClick={() => setActiveModal('password')}>Change Password</button>
        </div>

        <hr style={{ margin: '15px 0', borderColor: '#eee' }} />
        
        <button className="sign-out-btn" onClick={handleSignOut} style={{ color: '#d9534f', fontWeight: 'bold' }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}