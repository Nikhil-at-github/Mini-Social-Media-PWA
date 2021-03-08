const mongoose = require('mongoose');
const { Timestamp } = require('mongodb');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken:{
    type: String,
  },
  resetPasswordExpires:{
    type: Date,
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;