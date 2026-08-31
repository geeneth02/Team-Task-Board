const express = require('express');
const { register, login, getAllUsers, updateProfile, updatePassword } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers); 

// NEW routes for profile management
router.put('/profile/:id', updateProfile);
router.put('/password/:id', updatePassword);

module.exports = router;