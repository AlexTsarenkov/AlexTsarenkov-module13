/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { ForbiddenError } = require('../errors/errors.js');
const { linkValidator } = require('../validators/validators.js');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ForbiddenError('Invalid email or password');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ForbiddenError('Invalid email or password');
          }
          return user;
        });
    });
};

userSchema.path('avatar').validate(linkValidator, 'Invalid Avatar Url');
userSchema.path('email').validate(validator.isEmail, 'Invalid email');

module.exports = mongoose.model('user', userSchema);
