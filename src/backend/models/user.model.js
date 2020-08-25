const mongoose = require("mongoose");

const { Schema } = mongoose;
const user = new Schema(
  {
    name: {
      _id: Schema.Types.ObjectId,
      type: String,
      trim: true,
      required: "Name cannot be blank",
      unique: true,
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
  },
  { collection: "users" }
);

const User = mongoose.model("User", user);

module.exports = User;
