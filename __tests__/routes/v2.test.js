const { db } = require('../../src/models/index');
const supertest = require('supertest');
const server = require('../../src/server').server;
const mockRequest = supertest(server);

let adminToken = '';
let editorToken = '';
let writerToken = '';
let userToken = '';

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

beforeAll(async () => {
  const admin = await mockRequest.post('/signup').send({
    username: 'admin',
    password: 'password',
    role: 'admin',
  });
  adminToken = admin.body.token;
});

beforeAll(async () => {
  const editor = await mockRequest.post('/signup').send({
    username: 'editor',
    password: 'password',
    role: 'editor',
  });
  editorToken = editor.body.token;
});

beforeAll(async () => {
  const writer = await mockRequest.post('/signup').send({
    username: 'writer',
    password: 'password',
    role: 'writer',
  });
  writerToken = writer.body.token;
});

beforeAll(async () => {
  const user = await mockRequest.post('/signup').send({
    username: 'user',
    password: 'password',
    role: 'user',
  });
  userToken = user.body.token;
});

//------------------- post for v2 route -------------------

describe('Testing admin post permission', () => {
  test('should respond with a 201 status code', async () => {
    const response = await supertest(server)
      .post('/api/v2/drinks').send({
        beer: 'IPA',
      }).set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(201);
  });
});

describe('Testing editor post permission', () => {
  test('should respond with a 201 status code', async () => {
    const response = await supertest(server)
      .post('/api/v2/drinks').send({
        beer: 'IPA',
      }).set('Authorization', `Bearer ${editorToken}`);

    expect(response.statusCode).toBe(201);
  });
});

describe('Testing writer post permission', () => {
  test('should respond with a 201 status code', async () => {
    const response = await supertest(server)
      .post('/api/v2/drinks').send({
        beer: 'IPA',
      }).set('Authorization', `Bearer ${writerToken}`);

    expect(response.statusCode).toBe(201);
  });
});

describe('Testing user post permission', () => {
  test('should respond with a 500 status code', async () => {
    const response = await supertest(server)
      .post('/api/v2/drinks').send({
        beer: 'IPA',
      }).set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(500);
  });
});

//------------------- put for v2 route -------------------

describe('Testing admin put permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .put('/api/v2/drinks/1').send({
        beer: 'Pilsner',
      }).set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
  });
});

describe('Testing editor put permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .put('/api/v2/drinks/1').send({
        beer: 'Pilsner',
      }).set('Authorization', `Bearer ${editorToken}`);

    expect(response.statusCode).toBe(200);
  });
});

describe('Testing writer put permission', () => {
  test('should respond with a 500 status code', async () => {
    const response = await supertest(server)
      .put('/api/v2/drinks/1').send({
        beer: 'Pilsner',
      }).set('Authorization', `Bearer ${writerToken}`);

    expect(response.statusCode).toBe(500);
  });
});

describe('Testing user put permission', () => {
  test('should respond with a 500 status code', async () => {
    const response = await supertest(server)
      .put('/api/v2/drinks/1').send({
        beer: 'Pilsner',
      }).set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(500);
  });
});

// ------------------- get one v2 route -------------------

describe('Testing get one', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .get('/api/v2/drinks/1').set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
  });
});

//------------------- get for v2 route -------------------

describe('Testing admin get permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .get('/api/v2/drinks/').set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
  });
});

describe('Testing editor get permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .get('/api/v2/drinks/').set('Authorization', `Bearer ${editorToken}`);

    expect(response.statusCode).toBe(200);
  });
});

describe('Testing writer get permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .get('/api/v2/drinks/').set('Authorization', `Bearer ${writerToken}`);

    expect(response.statusCode).toBe(200);
  });
});

describe('Testing user get permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .get('/api/v2/drinks/').set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(200);
  });
});

//------------------- delete for v2 route -------------------

describe('Testing admin delete permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .delete('/api/v2/drinks/1').set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
  });
});

describe('Testing editor delete permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .delete('/api/v2/drinks/1').set('Authorization', `Bearer ${editorToken}`);

    expect(response.statusCode).toBe(500);
  });
});

describe('Testing writer delete permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .delete('/api/v2/drinks/1').set('Authorization', `Bearer ${writerToken}`);

    expect(response.statusCode).toBe(500);
  });
});

describe('Testing user delete permission', () => {
  test('should respond with a 200 status code', async () => {
    const response = await supertest(server)
      .delete('/api/v2/drinks/1').set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(500);
  });
});
