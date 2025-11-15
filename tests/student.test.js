const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Student routes', () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/studentdb_test';
    await mongoose.connect(uri, { dbName: 'studentdb_test' });
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET / returns 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
