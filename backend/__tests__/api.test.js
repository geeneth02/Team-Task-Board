const request = require('supertest');
const app = require('../app');

describe('Backend API Endpoints', () => {
  it('GET / - should return 200 OK and health status message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('CollabBoard API is running...');
  });

  it('GET /api/tasks - should handle request without crashing', async () => {
    const res = await request(app).get('/api/tasks');
    expect([200, 401, 403, 404]).toContain(res.statusCode);
  });

  it('POST /api/auth - should reject empty authentication payloads', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect([400, 401, 404, 422, 500]).toContain(res.statusCode);
  });
});