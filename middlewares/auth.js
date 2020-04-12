/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env || 'devsecretkey';

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Auth require' });
  }

  req.user = payload;
  next();
};

module.exports = { auth };
