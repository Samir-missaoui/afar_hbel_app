const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
  statut: String,
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  recipient: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "post",
  },
  notification: {
    type: String,
    default: "nouvelle notification",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notification", NotificationSchema);
