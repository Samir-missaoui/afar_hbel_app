const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");
var cloudinary = require("cloudinary").v2;
const { validationResult, body } = require("express-validator");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Add new post
// router.post(
//   "/add",
//   body("title", "firstname must contain only alphabetic").isAlpha(),
//   body("description", "lastname must contain only alphabetic").isAlpha(),
//   body("prix", "phone must contain only numeric").isNumeric(),
//   upload.single("picture"),
//   authMiddleware,
//   (req, res) => {
//     const imagepath = `http://localhost:5000/uploads/${req.file.filename}`;
//     const newbody = JSON.parse(req.body.info);
//     const errors = validationResult(newbody);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let newPost = new Post({ ...newbody, owner: req.userId, image: imagepath });
//     newPost
//       .save()
//       .then((post) => res.status(201).send(post))
//       .catch((err) => {
//         console.error(err.message);
//         res.status(500).send({ msg: "server Error" });
//       });
//   }
// );
router.post(
  "/add",
  body(
    "title",
    "Le titre ne doit contenir que des caractères alphabétiques"
  ).notEmpty(),
  body(
    "description",
    "La description ne doit contenir que des caractères alphabétiques"
  ).notEmpty(),
  body("categorie", "vous devez remplir la case catégorie").notEmpty(),
  body("souscategorie", "vous devez remplir la case souscatégorie").notEmpty(),
  body("delegation", "vous devez remplir la case délégation").notEmpty(),
  body("gouvernorat", "vous devez remplir la case gouvernorat").notEmpty(),
  body("prix", "vous devez remplir la case prix").notEmpty(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let newPost = new Post({ ...req.body });
    newPost
      .save()
      .then((post) => res.status(201).send(post))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "server Error" });
      });
  }
);
router.post(
  "/add/image",
  upload.single("picture"),
  authMiddleware,

  async (req, res) => {
    const imagepath = `http://localhost:5000/uploads/${req.file.filename}`;
    const imageInfo = await cloudinary.uploader.upload(req.file.path);
    const newbody = JSON.parse(req.body.info);
    console.log(imageInfo);
    Post.findByIdAndUpdate(
      newbody.PostId,
      {
        $set: {
          "image.IMAGE_URL": imageInfo.url,
          "image.PUBLIC_id": imageInfo.public_id,
          livraison: newbody.livraison,
        },
      },
      { returnDocument: "after" }
    )
      .then((post) => res.status(201).send(post))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "server Error" });
      });
  }
);
// Get Posts
router.get(
  "/posts",

  (req, res) => {
    const PageSize = req.query.pagesize;
    const CureentPage = req.query.currentpage;
    if (req.query.tri === "Date") {
      var postQuery = Post.find().sort({ created_at: -1 });
    } else if (req.query.tri === "Titre") {
      var postQuery = Post.find().sort({ title: 1 });
    } else if (req.query.tri === "Prix") {
      var postQuery = Post.find().sort({ prix: -1 });
    } else if (req.query.tri === "Nombre de cœurs") {
      var postQuery = Post.find().sort({ numbfavs: -1 });
    } else {
      var postQuery = Post.find();
    }
    if (PageSize && CureentPage) {
      postQuery.skip(PageSize * (CureentPage - 1)).limit(PageSize);
    }
    postQuery
      .then((posts) => res.send(posts))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" });
      });
  }
);
// Get user posts
router.get("/myposts", authMiddleware, (req, res) => {
  Post.find({ owner: req.userId })
    .then((posts) => res.status(200).send(posts))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});
router.get("/myposts/:postid", (req, res) => {
  Post.findById(req.params.postid)
    .then((posts) => res.status(200).send(posts))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});
// count posts
router.get("/count", (req, res) => {
  Post.count({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
