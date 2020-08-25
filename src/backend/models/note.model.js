const mongoose = require("mongoose");

const { Schema } = mongoose;
const note = new Schema(
  {
    _id: Schema.Types.ObjectId,
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
  },
  { collection: "notes" }
);

const Note = mongoose.model("Note", note);

module.exports = Note;
