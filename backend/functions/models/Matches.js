const mongoose = require("mongoose");

const MatchesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    course: {
      type: String,
      required: true,
      maxlength: 30,
      },
      status: {
        type: String,
        required: true,
        maxlength: 30,
      }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("matches", MatchesSchema);
