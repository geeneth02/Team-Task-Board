import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const getHexPoints = (cx, cy, r) => {
  const hw = (Math.sqrt(3) / 2) * r;
  const hh = r / 2;
  return `${cx},${cy - r} ${cx + hw},${cy - hh} ${cx + hw},${cy + hh} ${cx},${cy + r} ${cx - hw},${cy + hh} ${cx - hw},${cy - hh}`;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    password: ''
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
    setLoading(true); // From main: Starts the loading spinner

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, 
          password: formData.password
        })
      });

      const data = await response.json();
      
      // From auth-fix: Helpful for debugging
      console.log("Backend response:", data);

      if (!response.ok) {
        alert(data.message || 'Login failed: Invalid credentials');
        setLoading(false);
        return;
      }

      // 1. Store the token
      localStorage.setItem('token', data.token); 
      
      // 2. From auth-fix: Pull the registered name directly from the database response
      let dbName = formData.name; 
      
      if (data.user && data.user.firstName) {
          dbName = data.user.lastName ? `${data.user.firstName} ${data.user.lastName}` : data.user.firstName;
      } else if (data.user && data.user.name) {
          dbName = data.user.name;
      } else if (data.name) {
          dbName = data.name;
      }

      // Save the real database name to memory so Dashboard can use it
      localStorage.setItem('userName', dbName); 
      
      // 3. Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error during login:', error);
      alert('Cannot connect to backend server. Make sure your backend server is running on port 5000.');
      setLoading(false); // From main: Stops the loading spinner on error
    }
  };

  const R = 75; 
  const darkColor = "#021342";
  const lightColor = "#d6dadf";

  return (
    <div className="login-page-container">
      {/* Top-Left Cluster */}
      <svg className="hex-cluster top-left-svg" viewBox="0 0 350 350">
        <polygon points={getHexPoints(60, 20, R)} fill={darkColor} stroke="#007bff" strokeWidth="3" />
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

      <div className="login-card">
        <h1 className="login-title">SUNIL</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="signup-link-container">
            <span className="signup-link" onClick={() => navigate('/signup')}>
              Click here to Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;