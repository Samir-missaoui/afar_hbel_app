const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: String,
  messagespasvu: {
    type: Number,
    default: 0,
  },
  notificationspasvu: {
    type: Number,
    default: 0,
  },
  lastname: String,
  phone: Number,
  age: Number,
  email: String,
  password: String,
  favoris: [{ type: mongoose.Types.ObjectId, ref: "post" }],
  users: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  favs: [{ type: mongoose.Types.ObjectId, ref: "post" }],
  searches: [],
  blocage: [],
  created_at: {
    type: Date,
    default: Date.now,
  },
  image: {
    IMAGE_URL: {
      type: String,
      default:
        "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    },
    PUBLIC_id: String,
  },
});
module.exports = mongoose.model("user", UserSchema);
