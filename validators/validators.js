
const { Joi } = require('celebrate');

const urlRegExp = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$');

const postCardValidator = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(urlRegExp).required(),
  }),
};

const postUserValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp).required(),
  }),
};

const patchUserInfoValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const patchUserAvatarValidator = {
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegExp).required(),
  }),
};

const loginValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const idValidator = {
  params: Joi.object().keys({
    id: Joi.string().required().length(24),
  }),
};

function linkValidator(value) {
  return urlRegExp.test(value);
}
module.exports = {
  linkValidator,
  postCardValidator,
  postUserValidator,
  patchUserInfoValidator,
  patchUserAvatarValidator,
  loginValidator,
  idValidator,
};
