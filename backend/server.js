const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // NEW: Required for Socket.io
const { Server } = require('socket.io'); // NEW: Import Socket.io Server
require('dotenv').config();

// 1. Import your routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); 

// Initialize Express & HTTP Server
const app = express();
const server = http.createServer(app); // NEW: Wrap express app in http server

// Initialize Socket.io and allow CORS
const io = new Server(server, {
  cors: {
    origin: "*", // Allows frontend to connect from any local port
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Make io accessible globally or pass it to routes if needed
app.set('io', io);

// 2. Connect your routes to the app
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); 

// Basic test route
app.get('/', (req, res) => {
  res.send('CollabBoard API is running...');
});

// Socket.io Connection Handler
io.on('connection', (socket) => {
  console.log('⚡ A user connected via WebSocket:', socket.id);

  // Listen for task updates and broadcast to everyone else
  socket.on('taskUpdated', (updatedTask) => {
    socket.broadcast.emit('taskUpdateReceived', updatedTask);
  });

  // Listen for newly created tasks and broadcast
  socket.on('taskCreated', (newTask) => {
    socket.broadcast.emit('taskCreateReceived', newTask);
  });

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected');
  });
});

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/collabboard';

// Connect to MongoDB and start the HTTP server (instead of app.listen)
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    server.listen(PORT, () => { // NEW: server.listen starts both Express and Socket.io
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });

// Export the Express app for Supertest (Jest)
module.exports = app;