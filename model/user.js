const mongoose = require('mongoose');
const { linkValidator } = require('../validators/validators.js');

const userSchema = new mongoose.Schema({
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

userSchema.path('avatar').validate(linkValidator, 'Invalid Avatar Url');

module.exports = mongoose.model('user', userSchema);
