const express = require("express");
const { validationResult, body } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// update User
router.put(
  "/:userid",
  body("firstname", "firstname must contain only alphabetic").isAlpha(),
  body("lastname", "lastname must contain only alphabetic").isAlpha(),
  body("phone", "phone must contain only numeric").isNumeric(),
  body("age", "age must contain only numeric").isNumeric(),
  body("email", "please enter a valid email").isEmail(),
  body("password", "Please enter your password").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.email != req.body.email1) {
      User.find({ email: req.body.email }).then((users) => {
        if (users.length) {
          return res
            .status(400)
            .send({ errors: [{ msg: "User already exists" }] });
        }
      });
    }
    User.findOne({ _id: req.params.userid }).then((user) => {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        } else if (!isMatch) {
          return res
            .status(401)
            .json({ errors: [{ msg: "Wrong Password", param: "password" }] });
        } else {
          User.findByIdAndUpdate(
            req.params.userid,
            {
              $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                age: req.body.age,
                email: req.body.email,
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
      });
    });
  }
);
router.put(
  "/password/:userid",
  body("password", "Please enter your password").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ _id: req.params.userid }).then((user) => {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        } else if (!isMatch) {
          return res
            .status(401)
            .json({ errors: [{ msg: "Wrong Password", param: "password" }] });
        } else {
          if (!(req.body.confirmnewpassword === req.body.newpassword)) {
            return res.status(400).json({
              errors: [
                {
                  msg: "entrer des passwords identiques ",
                  param: "password",
                },
              ],
            });
          }
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw err;
            }
            bcrypt.hash(req.body.newpassword, salt, (err, hashedpwd) => {
              if (err) {
                throw err;
              }
              User.findByIdAndUpdate(
                req.params.userid,
                {
                  $set: {
                    password: hashedpwd,
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
            });
          });
        }
      });
    });
  }
);
router.put(
  "/post/:postid",
  body(
    "description",
    "La description ne doit contenir que des caractères alphabétiques"
  ).notEmpty(),
  body(
    "title",
    "Le titre ne doit contenir que des caractères alphabétiques"
  ).notEmpty(),
  body("prix", "prix ne doit contenir que des chiffres").isNumeric(),
  authMiddleware,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Post.findByIdAndUpdate(
      req.params.postid,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          prix: req.body.prix,
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

module.exports = router;
