const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  title: String,
  categorie: String,
  souscategorie: String,
  description: String,
  delegation: String,
  gouvernorat: String,
  livraison: {
    type: String,
    default: "",
  },
  prix: {
    type: Number,
    default: "",
  },
  // la3bed: [number],
  created_at: {
    type: Date,
    default: Date.now,
  },
  numbfavs: {
    type: Number,
    default: 0,
  },
  image: {
    IMAGE_URL: {
      type: String,
      default:
        "https://www.suzukijember.com/gallery/gambar_product/default.jpg",
    },
    PUBLIC_id: {
      type: String,
      default: 0,
    },
  },
});
module.exports = mongoose.model("post", PostSchema);
