const mongoose = require('mongoose');

const { Schema } = mongoose;
const user = new Schema({
  name: { type: String, trim: true, required: 'Name cannot be blank' },


}, { collection: 'users' });

const User = mongoose.model('user', user);

module.exports = User;
