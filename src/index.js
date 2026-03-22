require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Gagal koneksi ke database:', err.stack);
  }
  console.log('Berhasil terhubung ke PostgreSQL!');
  release();
});

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API Perpustakaan PPL I Siap Digunakan!',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});