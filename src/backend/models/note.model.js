"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;
const note = new Schema(
  {
    pageLink: {
      type: String,
      trim: true,
    },
    // store body as HTML string from FE
    body: { type: String },
    videoLink: {
      type: String,
      trim: true,
      default: "",
    },
    imgLink: {
      type: String,
      trim: true,
      default: "",
    },
    userID: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
  },
  { collection: "notes" }
);

const Note = mongoose.model("Note", note);

module.exports = Note;
