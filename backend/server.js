const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Import your auth routes
const authRoutes = require('./routes/authRoutes');

// Initialize Express
const app = express();

// Middleware
app.use(cors()); // Allows frontend to make requests to this backend
app.use(express.json()); // Parses incoming JSON data

// 2. Connect your routes to the app
app.use('/api/auth', authRoutes);

// Basic test route
app.get('/', (req, res) => {
  res.send('CollabBoard API is running...');
});

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/collabboard';

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });