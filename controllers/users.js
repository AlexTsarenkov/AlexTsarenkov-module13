const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Server cannot resolve query: ${err}` }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not Found') res.status(404).send({ error: 'user does not exist' });
      else res.status(500).send({ message: `Server cannot resolve query: ${err}` });
    });
};

const postNewUser = (req, res) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    })
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        if (err.message === 'Already exist') res.status(40).send({ error: 'user does not exist' });
        else res.status(500).send({ message: `Server cannot post user ${err}` });
      }));
};

const patchUserInfo = (req, res) => {
  const { name, about, user } = req.body;

  User.findByIdAndUpdate(user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new Error('Not Found'))
    .then((me) => res.send(me))
    .catch((err) => {
      if (err.message === 'Not Found') res.status(404).send({ error: 'user does not exist' });
      else res.status(500).send({ message: `Server cannot update user bio: ${err}` });
    });
};

const patchUserAvatar = (req, res) => {
  const { avatar, user } = req.body;

  User.findByIdAndUpdate(user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new Error('Not Found'))
    .then((me) => res.send(me))
    .catch((err) => {
      if (err.message === 'Not Found') res.status(404).send({ error: 'user does not exist' });
      else res.status(500).send({ message: `Server cannot update user avatar: ${err}` });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
      }).status(200).send({ message: 'success' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};


module.exports = {
  getUsers, getUserById, postNewUser, patchUserInfo, patchUserAvatar, login,
};
