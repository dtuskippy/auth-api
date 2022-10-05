'use strict';

const { db } = require('../../src/models/index');
const supertest = require('supertest');
const server = require('../../src/server').server;
const mockRequest = supertest(server);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('Auth Router', () => {

  describe('ACL Role positions-', () => {
    it('user role should have read capabilities', async () => {
      const user = await mockRequest.post('/signup').send({
        username: 'user',
        password: 'password',
        roll: 'user',
      });

      expect(user.status).toEqual(201);
      expect(user.body.token).toBeTruthy();
      expect(user.body.user.capabilities).toEqual(['read']);
    });
    it('writer role should have read, create capabilities', async () => {
      const writer = await mockRequest.post('/signup').send({
        username: 'writer',
        password: 'password',
        role: 'writer',
      });

      expect(writer.status).toEqual(201);
      expect(writer.body.token).toBeTruthy();
      expect(writer.body.user.capabilities).toEqual(['read', 'create']);
    });
    it('editor role should have read, create, update capabilities', async () => {
      const editor = await mockRequest.post('/signup').send({
        username: 'editor',
        password: 'password',
        role: 'editor',
      });

      expect(editor.status).toEqual(201);
      expect(editor.body.token).toBeTruthy();
      expect(editor.body.user.capabilities).toEqual(['read', 'create', 'update']);
    });
    it('admin role should have read, create, update, delete capabilities', async () => {
      const admin = await mockRequest.post('/signup').send({
        username: ' admin',
        password: 'password',
        role: 'admin',
      });

      expect(admin.status).toEqual(201);
      expect(admin.body.token).toBeTruthy();
      expect(admin.body.user.capabilities).toEqual(['read', 'create', 'update', 'delete']);
    });
  });
});

