const express = require("express");
var cloudinary = require("cloudinary").v2;
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const { body, validationResult, check } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
//Register USER
router.post(
  "/",
  body(
    "firstname",
    "Le prénom ne doit contenir que des caractères alphabétiques"
  ).isAlpha(),
  body(
    "lastname",
    "Le nom ne doit contenir que des caractères alphabétiques"
  ).isAlpha(),
  // body("phone", "phone must contain only numeric", "minimum 8 chiffres")
  //   .isNumeric()
  //   .isLength({
  //     min: 8,
  //   }),
  // body("phone", "minimum 8 chiffres").isLength({
  //   min: 8,
  // }),
  check("phone")
    .isNumeric()
    .withMessage("Le téléphone ne doit contenir que des chiffres")
    .isLength({
      min: 8,
    })
    .withMessage("Le téléphone ne doit contenir au moin 8 chiffres"),
  body("age", "age ne doit contenir que des chiffres").isNumeric(),
  body("email", "veuillez saisir une adresse e-mail validel").isEmail(),
  body(
    "password",
    "la longueur minimale autorisée est de 5 caractèress"
  ).isLength({
    min: 5,
  }),
  upload.single("picture"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.find({ email: req.body.email }).then((users) => {
      if (users.length) {
        return res
          .status(400)
          .send({ errors: [{ msg: "User already exists" }] });
      }
      let newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }
        bcrypt.hash(req.body.password, salt, (err, hashedpwd) => {
          if (err) {
            throw err;
          }
          newUser.password = hashedpwd;

          newUser.save();

          let payload = {
            userId: newUser._id,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        });
      });
    });
  }
);
router.post(
  "/image",
  upload.single("picture"),
  authMiddleware,

  async (req, res) => {
    // const imagepath = `http://localhost:5000/uploads/${req.file.filename}`;
    const imageInfo = await cloudinary.uploader.upload(req.file.path);
    console.log(imageInfo);
    User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          "image.IMAGE_URL": imageInfo.url,
          "image.PUBLIC_id": imageInfo.public_id,
        },
      },
      { returnDocument: "after" }
    )
      .select("-password -__v")
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "server Error" });
      });
  }
);

module.exports = router;
