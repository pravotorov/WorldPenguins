const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: {type: String,required: true},
  password: {type: String,required: true},
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
