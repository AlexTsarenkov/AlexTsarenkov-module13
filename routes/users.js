const { celebrate } = require('celebrate');
const userRoute = require('express').Router();
const loginRoute = require('express').Router();
const {
  getUsers, getUserById, postNewUser, patchUserInfo, patchUserAvatar, login,
} = require('../controllers/users.js');
const {
  postUserValidator,
  patchUserInfoValidator,
  patchUserAvatarValidator,
  loginValidator,
  idValidator,
} = require('../validators/validators.js');

userRoute.get('/', getUsers);
userRoute.get('/:id', celebrate(idValidator), getUserById);
userRoute.patch('/me', celebrate(patchUserInfoValidator), patchUserInfo);
userRoute.patch('/me/avatar', celebrate(patchUserAvatarValidator), patchUserAvatar);

loginRoute.post('/signin', celebrate(loginValidator), login);
loginRoute.post('/signup', celebrate(postUserValidator), postNewUser);

module.exports = { userRoute, loginRoute };
