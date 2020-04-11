/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Auth require' });
  }

  req.body.user = payload;
  next();
};

module.exports = { auth };
