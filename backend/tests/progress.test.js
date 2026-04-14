const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');

beforeAll(async () => {
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) => {
      mongoose.connection.once('connected', resolve);
      setTimeout(resolve, 10000);
    });
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Progress routes — unauthenticated', () => {
  test('GET /api/progress/fakeid without token → 401', async () => {
    const res = await request(app).get('/api/progress/fakeid');
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/progress/fakeid/complete without token → 401', async () => {
    const res = await request(app)
      .post('/api/progress/fakeid/complete')
      .send({ lessonId: 'l1', sectionId: 'sec1' });
    expect(res.statusCode).toBe(401);
  });

  test('DELETE /api/progress/fakeid/lesson/l1 without token → 401', async () => {
    const res = await request(app).delete('/api/progress/fakeid/lesson/l1');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/progress/fakeid/stats without token → 401', async () => {
    const res = await request(app).get('/api/progress/fakeid/stats');
    expect(res.statusCode).toBe(401);
  });
});
