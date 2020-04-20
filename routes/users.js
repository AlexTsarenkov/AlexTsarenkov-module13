const userRoute = require('express').Router();
const loginRoute = require('express').Router();
const {
  getUsers, getUserById, postNewUser, patchUserInfo, patchUserAvatar, login,
} = require('../controllers/users.js');

userRoute.get('/', getUsers);
userRoute.get('/:id', getUserById);
userRoute.patch('/me', patchUserInfo);
userRoute.patch('/me/avatar', patchUserAvatar);

loginRoute.post('/signin', login);
loginRoute.post('/signup', postNewUser);

module.exports = { userRoute, loginRoute };
