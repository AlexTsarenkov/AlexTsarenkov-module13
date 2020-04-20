/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { UnathorizedError } = require('../errors/errors.js');

const { JWT_SECRET } = process.env || 'devsecretkey';

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnathorizedError('Authorization require'));
  }
  req.user = payload;
  next();
};

module.exports = { auth };
