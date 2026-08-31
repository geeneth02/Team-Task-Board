const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// 1. Import your routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); 

// Initialize Express & HTTP Server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io and allow CORS
const io = new Server(server, {
  cors: {
    origin: "*",
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

  socket.on('taskUpdated', (updatedTask) => {
    socket.broadcast.emit('taskUpdateReceived', updatedTask);
  });

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

// Always connect to MongoDB so test routes can query the database
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });

// Only start the HTTP server if NOT running tests (prevents port conflicts)
if (!process.env.JEST_WORKER_ID) {
  server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

// Export the Express app for Supertest (Jest)
module.exports = app;