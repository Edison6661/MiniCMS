const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Тестовий маршрут
app.get('/', (req, res) => {
  res.send('MiniCMS API працює 🎉');
});

// Підключення до бази
db.authenticate()
  .then(() => console.log('✅ Підключено до БД'))
  .catch(err => console.error('❌ Помилка БД:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущено на порту ${PORT}`));

const authRoutes = require('./routes/auth');

// Після app.use(express.json())
app.use('/api/auth', authRoutes);

const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Помилка сервера', error: err.message });
});

const fs = require('fs');
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}