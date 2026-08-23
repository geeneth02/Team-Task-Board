import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Notice the added './components/' in the paths below!
import LoginPage from './components/LoginPage'; 
import SignupPage from './components/SignupPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
