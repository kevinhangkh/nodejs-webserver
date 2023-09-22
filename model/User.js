const mongoose = require('mongoose');
const ROLE_LIST = require('../config/rolesList');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    Admin: String,
    Editor: String,
    User: {
      type: String,
      default: ROLE_LIST.User,
    },
  },
  refreshToken: String
});

module.exports = mongoose.model('User', userSchema);
