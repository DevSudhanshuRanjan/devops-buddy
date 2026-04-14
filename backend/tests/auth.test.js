const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Wait for the connection initiated in app.js
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) => {
      mongoose.connection.once('connected', resolve);
      // Timeout after 10s
      setTimeout(resolve, 10000);
    });
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Health Checks', () => {
  test('GET /health → 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /health/db → 200 when connected', async () => {
    const res = await request(app).get('/health/db');
    expect(res.statusCode).toBe(200);
    expect(res.body.db).toBe('connected');
  });
});

describe('Auth — unauthenticated access', () => {
  test('GET /auth/me without token → 401', async () => {
    const res = await request(app).get('/auth/me');
    expect(res.statusCode).toBe(401);
  });

  test('POST /auth/logout without token → 401', async () => {
    const res = await request(app).post('/auth/logout');
    expect(res.statusCode).toBe(401);
  });
});

describe('User routes — unauthenticated', () => {
  test('GET /api/users/fakeid without token → 401', async () => {
    const res = await request(app).get('/api/users/fakeid');
    expect(res.statusCode).toBe(401);
  });
});

describe('404 handling', () => {
  test('GET /nonexistent → 404', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toContain('not found');
  });
});
