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

describe('Quiz routes — unauthenticated', () => {
  test('POST /api/quiz/fakeid/submit without token → 401', async () => {
    const res = await request(app)
      .post('/api/quiz/fakeid/submit')
      .send({
        answers: Array.from({ length: 10 }, (_, i) => ({
          questionId: i + 1,
          selectedOption: 'A',
        })),
      });
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/quiz/fakeid/results without token → 401', async () => {
    const res = await request(app).get('/api/quiz/fakeid/results');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/quiz/fakeid/best without token → 401', async () => {
    const res = await request(app).get('/api/quiz/fakeid/best');
    expect(res.statusCode).toBe(401);
  });
});
