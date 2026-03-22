const request = require('supertest');
const app = require('../src/index');

let bookId;

describe('Full CRUD API Integration Test', () => {
  beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  });

  it('POST /api/books - Harus bisa nambah buku baru', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        isbn: "978-979-3062-79-1",
        published_year: 2005
      });

    if (res.statusCode === 500) console.log("Detail Error:", res.body);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    bookId = res.body.data.id;
  });

  it('GET /api/books - Harus mengembalikan array buku', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('PUT /api/books/:id - Harus bisa update ke Edisi Revisi', async () => {
    const res = await request(app)
      .put(`/api/books/${bookId}`)
      .send({
        title: "Laskar Pelangi - Edisi Revisi",
        author: "Andrea Hirata",
        isbn: "978-979-3062-79-1",
        published_year: 2005
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("Laskar Pelangi - Edisi Revisi");
  });

  it('DELETE /api/books/:id - Harus bisa menghapus buku', async () => {
    const res = await request(app).delete(`/api/books/${bookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/berhasil dihapus/i);
  });
});