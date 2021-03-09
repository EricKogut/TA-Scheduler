const mongoose = require("mongoose");

const MatchesSchema = new mongoose.Schema(
  {
    courseID: {
      type: { type: mongoose.ObjectId, ref: 'Course' },
    },
    hiringEventID: {
      type: mongoose.ObjectId, ref: 'HiringEvent'
      },
      hoursFilled: {
        type: Number,
      },
      applicants:[Object]

  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("matches", MatchesSchema);
