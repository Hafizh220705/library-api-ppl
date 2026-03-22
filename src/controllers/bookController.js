const Book = require('../models/bookModel');

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.getAll();
      res.status(200).json({
        status: 'success',
        message: 'Daftar buku berhasil diambil',
        data: books
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Gagal mengambil data buku',
        error: error.message
      });
    }
  },

  createBook: async (req, res) => {
    try {
      const { title, author, isbn, published_year } = req.body;

      if (!title || !author || !isbn) {
        return res.status(400).json({
          status: 'fail',
          message: 'Judul, penulis, dan ISBN wajib diisi'
        });
      }

      const newBook = await Book.create(title, author, isbn, published_year);
      res.status(201).json({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: newBook
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Gagal menambahkan buku',
        error: error.message
      });
    }
  }
};

module.exports = bookController;