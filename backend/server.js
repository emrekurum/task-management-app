require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); // Kullanıcı oturum rotaları
const taskRoutes = require('./routes/taskRoutes'); // Görev rotaları

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Rotaları kullanma
app.use('/api/auth', authRoutes); // Kullanıcı kayıt ve giriş rotaları
app.use('/api/tasks', taskRoutes); // Görev yönetimi rotaları

// Genel Hata Yönetimi Middleware'i
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong, please try again later.' });
}
app.use(errorHandler);

// Sunucuyu başlatma
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
