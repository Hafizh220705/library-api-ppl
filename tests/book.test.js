const request = require('supertest');
const app = require('../src/index');

describe('Book API Integration Tests', () => {

  describe('GET /api/books', () => {
    it('should return all books with status 200', async () => {
      const res = await request(app).get('/api/books');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'success');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book and return 201', async () => {
      const newBook = {
        title: "Buku Test CI",
        author: "Robot GitHub",
        isbn: "TEST-" + Date.now(),
        published_year: 2024
      };

      const res = await request(app)
        .post('/api/books')
        .send(newBook);

      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('title', newBook.title);
      expect(res.body.data).toHaveProperty('isbn', newBook.isbn);
    });

    it('should return 400 if title is missing', async () => {
      const invalidBook = {
        author: "No Title",
        isbn: "FAIL-123"
      };

      const res = await request(app)
        .post('/api/books')
        .send(invalidBook);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('status', 'fail');
      expect(res.body.message).toMatch(/wajib diisi/i);
    });
  });
});