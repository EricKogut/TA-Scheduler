const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      maxlength: 30,
    },
    role: {
      type: String,
      required: true,
      maxlength: 10,
    },
    userID: {
      type: String,
      required: true
    },
    hiringEventID: {
      type: { type: mongoose.ObjectId, ref: 'HiringEvent' },
      required: false
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("users", UsersSchema);
