const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log('Register attempt:', { name, email, role }); // Debug log
  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password: await bcrypt.hash(password, 10), role: role || 'user' });
    await user.save();
    console.log('User registered successfully:', email);

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (err) {
    console.error('Registration error:', err.message, err.stack);
    res.status(500).json({ msg: 'Server error during registration', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email }); // Debug log
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('Login successful for:', email);
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    console.error('Login error:', err.message, err.stack);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

router.post('/verify-admin', async (req, res) => {
  const token = req.body.token;
  console.log('Verify admin attempt with token:', token); // Debug log
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user && user.role === 'admin') {
      console.log('Admin verified:', user.email);
      res.json({ role: user.role });
    } else {
      console.log('Admin access denied for user:', decoded.id);
      res.status(403).json({ msg: 'Admin access denied' });
    }
  } catch (err) {
    console.error('Verify admin error:', err.message, err.stack);
    res.status(401).json({ msg: 'Invalid token', error: err.message });
  }
});

module.exports = router;
