const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignees: [{ type: String }], 
  startDate: { type: String },
  dueDate: { type: String },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'High' },
  status: { type: String, enum: ['Not Started', 'Ongoing', 'Finished'], default: 'Not Started' },
  createdBy: { type: String } // <-- NEW: Tracks the manager who created this task
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);