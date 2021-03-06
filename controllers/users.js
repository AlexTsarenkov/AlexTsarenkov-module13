/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { NotFoundError, ConflictError } = require('../errors/errors');

let JWT_SECRET;

if (process.env.NODE_ENV === 'production') {
  JWT_SECRET = process.env.JWT_SECRET;
} else {
  JWT_SECRET = 'supersecretdevkey';
}

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFoundError('user not found'))
    .then((user) => res.send(user))
    .catch(next);
};

const postNewUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(`User with ${email} email already exist`);
      }

      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
          about,
          avatar,
        }))
        .then((createdUser) => {
          createdUser.password = undefined;
          res.status(201).send(createdUser);
        });
    })
    .catch(next);
};

const patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('user not found'))
    .then((me) => res.send(me))
    .catch(next);
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('user not found'))
    .then((me) => res.send(me))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('user not found');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
      }).status(200).send({ message: 'success' });
    })
    .catch(next);
};


module.exports = {
  getUsers, getUserById, postNewUser, patchUserInfo, patchUserAvatar, login,
};
