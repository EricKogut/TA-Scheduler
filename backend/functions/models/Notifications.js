const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema(
  {
    senderEmail: { 
        type: String, 
        maxlength: 30 },

    recipientEmail: {
      type: String,
      maxlength: 30,
    },
    recipientRole: {
      type: String,
      maxlength: 10,
    },
    message: {
        type: String,
        required: true,
        maxlength: 200,
    },
    read:{
        type: Number,
        default: 0,
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("notifications", NotificationsSchema);
