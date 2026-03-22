const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const Book = {
  getAll: async () => {
    const query = 'SELECT * FROM books ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
  },

  create: async (title, author, isbn, published_year) => {
    const query = `
      INSERT INTO books (title, author, isbn, published_year)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [title, author, isbn, published_year];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getById: async (id) => {
    const query = 'SELECT * FROM books WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  update: async (id, title, author, isbn, published_year) => {
    const query = `
      UPDATE books 
      SET title = $1, author = $2, isbn = $3, published_year = $4 
      WHERE id = $5 
      RETURNING *`;
    const values = [title, author, isbn, published_year, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = Book;