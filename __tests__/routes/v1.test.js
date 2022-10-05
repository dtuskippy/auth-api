const { db } = require('../../src/models/index');
const supertest = require('supertest');
const server = require('../../src/server').server;

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

//------------------- post for v2 route -------------------

describe('Testing v1 post', () => {
  test('should respond with a 201 status code', async () => {
    const response = await supertest(server)
      .post('/api/v1/drinks').send({
        beer: 'IPA',
      });
    expect(response.statusCode).toBe(201);
  });
});

//------------------- put for v2 route -------------------

describe('Testing v1 put', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .put('/api/v1/drinks/1').send({
        beer: 'Pilsner',
      });
    expect(response.statusCode).toBe(200);
  });
});

// ------------------- get one v2 route -------------------

describe('Testing v1 get one', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .get('/api/v1/drinks/1');
    expect(response.statusCode).toBe(200);
  });
});

//------------------- get for v2 route -------------------

describe('Testing v1 get many', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .get('/api/v1/drinks/');
    expect(response.statusCode).toBe(200);
  });
});

//------------------- delete for v2 route -------------------

describe('Testing v1 delete', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .delete('/api/v1/drinks/1');
    expect(response.statusCode).toBe(200);
  });
});
