const mongoose = require("mongoose");

const { Schema } = mongoose;
const user = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name cannot be blank",
      unique: true,
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    date: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

const User = mongoose.model("User", user);

module.exports = User;
