'use strict';

process.env.SECRET = 'TEST_SECRET';

const base64 = require('base-64');
const middleware = require('../../src/auth/middleware/basic');
const { db, user } = require('../../src/models/index');

let userInfo = {
  admin: { username: 'admin-basic', password: 'password' },
};

// Pre-load our database with fake user
beforeAll(async () => {
  await db.sync();
  await user.create(userInfo.admin);
});
afterAll(async () => {
  await db.drop();
});

describe('Auth Middleware', () => {

  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', async () => {
      const basicAuthString = base64.encode('username:password');

      // Change the request to match this test case
      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      await middleware(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);

    });

    it('logs in an admin user with the right credentials', async () => {
      let basicAuthString = base64.encode(`${userInfo.admin.username}:${userInfo.admin.password}`);

      // Change the request to match this test case
      req.headers = {
        authorization: `Basic ${basicAuthString}`,
      };

      await middleware(req, res, next);
      expect(next).toHaveBeenCalledWith();

    });
  });
});
