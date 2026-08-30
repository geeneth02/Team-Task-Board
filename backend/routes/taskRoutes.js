const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask); // NEW: Route for updating
router.delete('/:id', deleteTask); // NEW: Route for deleting

module.exports = router;