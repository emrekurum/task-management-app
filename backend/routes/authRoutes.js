const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).send('User already exists');

  const user = new User({ username, email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Kullanıcı girişi
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Kullanıcı Profilini Görüntüleme
router.get('/profile', authMiddleware, async (req, res) => {
    try {
      // Kimliği doğrulanmış kullanıcıyı getiriyoruz
      const user = await User.findById(req.user._id).select('-password');
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  
  // Kullanıcı Profilini Güncelleme
  router.put('/profile', authMiddleware, async (req, res) => {
    try {
      const { username, email } = req.body;
      const user = await User.findById(req.user._id);
  
      // Kullanıcı adı veya e-posta güncelleniyor
      if (username) user.username = username;
      if (email) user.email = email;
  
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;
