'use strict';

process.env.SECRET = 'TEST_SECRET';

const bearer = require('../../src/auth/middleware/bearer');
const { db, user } = require('../../src/models/index');
const jwt = require('jsonwebtoken');

let userInfo = {
  admin: { username: 'admin', password: 'password' },
};

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
    json: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', async () => {

      req.headers = {
        authorization: 'Bearer this is a bad token',
      };

      await bearer(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('logs in a user with a proper token', async () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, process.env.SECRET, { expiresIn: 1000 * 60 * 24 });

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      await bearer(req, res, next);
      expect(next).toHaveBeenCalledWith();

    });
  });
});
