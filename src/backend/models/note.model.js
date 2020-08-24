const mongoose = require('mongoose');

const { Schema } = mongoose;
const note = new Schema({
  pageLink: { type: String, trim: true, required: 'Page Link cannot be blank' },
  body: { type: String, trim: true, required: 'Note body cannot be blank' },

}, { collection: 'notes' });

const Note = mongoose.model('note', note);

module.exports = Note;
