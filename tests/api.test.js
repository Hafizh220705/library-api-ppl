const request = require('supertest');

const baseUrl = 'http://localhost:3000'; 

describe('GET /api/books', () => {
  it('should return 200 and success status', async () => {
    const response = await request(baseUrl).get('/api/books');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
  });
});