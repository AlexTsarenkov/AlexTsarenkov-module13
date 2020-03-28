const User = require('../model/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: `Server cannot resolve query: ${err}` }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Server cannot resolve query: ${err}` }));
};

module.exports.postNewUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Server cannot post new user: ${err}` }));
};

module.exports.patchUserInfo = (req, res) => {
  const { name, about, user } = req.body;

  User.findByIdAndUpdate(user._id, { name, about })
    .then((me) => res.send(me))
    .catch((err) => res.status(500).send({ message: `Server cannot update user info: ${err}` }));
};

module.exports.patchUserAvatar = (req, res) => {
  const { avatar, user } = req.body;

  User.findByIdAndUpdate(user._id, { avatar })
    .then((me) => res.send(me))
    .catch((err) => res.status(500).send({ message: `Server cannot update user avatar: ${err}` }));
};
