const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  statut: String,
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  recipient: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  message: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("message", MessageSchema);
