const mongoose = require("mongoose");

const { Schema } = mongoose;
const note = new Schema(
  {
    pageLink: {
      type: String,
      trim: true,
      required: "Page Link cannot be blank",
    },
    // store body as HTML string from FE
    body: { type: String, required: "Note body cannot be blank" },
    videoLink: {
      type: String,
      trim: true,
    },
    imgLink: {
      type: String,
      trim: true,
    },
    private: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "notes" }
);

const Note = mongoose.model("note", note);

module.exports = Note;
