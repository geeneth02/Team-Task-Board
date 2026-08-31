const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignees: [{ type: String }], // To hold names like "Amaya (UI)" or "Ravindu (PM)"
  startDate: { type: String },
  dueDate: { type: String },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'High' },
  status: { type: String, enum: ['Not Started', 'Ongoing', 'Finished'], default: 'Not Started' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);