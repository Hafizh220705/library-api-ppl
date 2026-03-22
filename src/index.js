require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Konfigurasi Database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(express.json());

const initializeDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('Berhasil terhubung ke PostgreSQL!');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        isbn VARCHAR(50) UNIQUE NOT NULL,
        published_year INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Tabel "books" siap digunakan.');
    client.release();
  } catch (err) {
    console.error('Gagal koneksi atau inisialisasi database:', err.message);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

initializeDatabase();

// Routes
app.use('/api/books', bookRoutes);

// Root Endpoint (Health Check)
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Library API is running' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
}

module.exports = app;