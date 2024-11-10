const express = require('express');
const Task = require('../models/task');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Görev Listeleme (Filtreleme ve Sıralama ile)
router.get('/list', authMiddleware, async (req, res, next) => {
  try {
    const { completed, category, sortBy } = req.query; // Filtreleme ve sıralama için sorgu parametreleri
    const filter = { user: req.user._id }; // Kullanıcıya göre filtreleme

    // Tamamlanma durumuna göre filtreleme
    if (completed) {
      filter.completed = completed === 'true';
    }

    // Kategoriye göre filtreleme
    if (category) {
      filter.category = category;
    }

    // Sıralama işlemi
    let sortOption = {};
    if (sortBy === 'createdAt') {
      sortOption.createdAt = -1; // En yeni görevlere göre sıralama
    } else if (sortBy === 'title') {
      sortOption.title = 1; // Başlığa göre alfabetik sıralama
    }

    const tasks = await Task.find(filter).sort(sortOption);
    res.status(200).json({ message: 'Tasks retrieved successfully', tasks });
  } catch (err) {
    next(err);
  }
});

// Görev Ekleme
router.post('/add', authMiddleware, async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const task = new Task({ title, description, category, user: req.user._id });
    await task.save();
    res.status(201).json({ message: 'Task added successfully', task });
  } catch (err) {
    next(err);
  }
});

// Görev Güncelleme
router.put('/update/:id', authMiddleware, async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (category) task.category = category;

    await task.save();
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (err) {
    next(err);
  }
});

// Görev Tamamla
router.put('/complete/:id', authMiddleware, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }
    task.completed = true;
    await task.save();
    res.status(200).json({ message: 'Task completed successfully', task });
  } catch (err) {
    next(err);
  }
});

// Görev Silme
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }
    await task.remove();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
