import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const getHexPoints = (cx, cy, r) => {
  const hw = (Math.sqrt(3) / 2) * r;
  const hh = r / 2;
  return `${cx},${cy - r} ${cx + hw},${cy - hh} ${cx + hw},${cy + hh} ${cx},${cy + r} ${cx - hw},${cy + hh} ${cx - hw},${cy - hh}`;
};

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      alert('Account created successfully! Please log in.');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Cannot connect to backend server. Make sure your backend server is running on port 5000.');
      setLoading(false);
    }
  };

  const R = 75;
  const darkColor = "#021342";
  const lightColor = "#d6dadf";

  return (
    <div className="signup-page-container">
      {/* Top-Left Cluster */}
      <svg className="hex-cluster top-left-svg" viewBox="0 0 350 350">
        <polygon points={getHexPoints(60, 20, R)} fill={darkColor} />
        <polygon points={getHexPoints(190, 20, R)} fill={lightColor} />
        <polygon points={getHexPoints(-5, 132.5, R)} fill={lightColor} />
        <polygon points={getHexPoints(125, 132.5, R)} fill={darkColor} />
        <polygon points={getHexPoints(60, 245, R)} fill={lightColor} />
        <polygon points={getHexPoints(190, 245, R)} fill={lightColor} />
      </svg>

      {/* Top-Right Cluster */}
      <svg className="hex-cluster top-right-svg" viewBox="0 0 350 350">
        <polygon points={getHexPoints(160, 20, R)} fill={lightColor} />
        <polygon points={getHexPoints(290, 20, R)} fill={lightColor} />
        <polygon points={getHexPoints(95, 132.5, R)} fill={lightColor} />
        <polygon points={getHexPoints(225, 132.5, R)} fill={darkColor} />
        <polygon points={getHexPoints(160, 245, R)} fill={lightColor} />
      </svg>

      {/* Bottom-Left Cluster */}
      <svg className="hex-cluster bottom-left-svg" viewBox="0 0 350 350">
        <polygon points={getHexPoints(125, 105, R)} fill={lightColor} />
        <polygon points={getHexPoints(60, 217.5, R)} fill={darkColor} />
        <polygon points={getHexPoints(190, 217.5, R)} fill={lightColor} />
      </svg>

      {/* Bottom-Right Cluster */}
      <svg className="hex-cluster bottom-right-svg" viewBox="0 0 350 350">
        <polygon points={getHexPoints(160, 105, R)} fill={lightColor} />
        <polygon points={getHexPoints(290, 105, R)} fill={lightColor} />
        <polygon points={getHexPoints(225, 217.5, R)} fill={darkColor} />
      </svg>

      {/* Center Card */}
      <div className="signup-card">
        <h1 className="signup-title">Welcome!</h1>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="firstName">First Name :</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name :</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Create a password :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign UP'}
          </button>
        </form>
      </div>

      {/* Footer Text */}
      <div className="varg-solutions">
        VARG Solutions
      </div>
    </div>
  );
};

export default SignupPage;