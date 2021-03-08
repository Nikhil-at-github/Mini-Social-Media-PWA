const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
});

const Googleuser = mongoose.model('Googleuser', userSchema);

module.exports = Googleuser;