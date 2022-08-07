const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Message = require("../models/Message");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//LOAD CONNECTED USER
router.get("/", authMiddleware, (req, res) => {
  User.findById(req.userId)
    .populate("favoris")
    .populate("users")
    .select("-password -__v")
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ msg: "User not found", param: "password" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server Error" });
    });
});
//load users
router.put("/users/:userId", authMiddleware, (req, res) => {
  if (User.find({ _id: req.userId, users: req.params.userId }).count() === 0) {
    User.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          users: req.params.userId,
        },
      },
      { returnDocument: "after" }
    )
      .populate("favoris")
      .populate("users")
      .select("-password -__v")
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "server Error" });
      });
  }
});
router.get("/:userid", (req, res) => {
  User.findById(req.params.userid)
    .select("-password -__v")
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ msg: "User not found", param: "password" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server Error" });
    });
});
//LOGIN USER
router.post(
  "/",
  body("email", "please enter a valid email").isEmail(),
  body("password", "Please enter your password").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ msg: "Please register before", param: "email" }],
        });
      }

      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        } else if (!isMatch) {
          return res
            .status(401)
            .json({ errors: [{ msg: "Wrong Password", param: "password" }] });
        } else {
          let payload = {
            userId: user._id,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            }
            res.send({ token });
          });
        }
      });
    });
  }
);
module.exports = router;
