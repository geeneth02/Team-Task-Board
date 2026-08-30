const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;

    const existingUser = await User.findOne({ firstName });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Let the User model pre-save hook handle the hashing
    const user = await User.create({ 
      firstName, 
      lastName, 
      password 
    });

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ firstName: name });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};