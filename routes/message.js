const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const Message = require("../models/Message");
const User = require("../models/User");
//Ajouter message
router.post("/", authMiddleware, async (req, res) => {
  let res_obj = {};
  let newMessage = new Message({
    ...req.body,
    sender: req.userId,
    statut: "envoyé",
  });
  newMessage.save();
  const third_query = await User.find({ _id: req.userId }).updateMany(
    { users: { $nin: [req.body.recipient] } },
    {
      $push: {
        users: req.body.recipient,
      },
    },
    { returnDocument: "after" }
  );
  const second_query = await User.findByIdAndUpdate(
    req.body.recipient,
    {
      $inc: {
        messagespasvu: +1,
      },
    },
    { returnDocument: "after" }
  );
  res_obj = {
    ...res_obj,
    first_query_res: newMessage,
    second_query_res: second_query,
    third_query_res: third_query,
  };
  res.send(res_obj);
});
// load messages
router.get("/load/:userId", authMiddleware, (req, res) => {
  Message.find({
    $or: [
      { $and: [{ sender: req.userId }, { recipient: req.params.userId }] },
      { $and: [{ sender: req.params.userId }, { recipient: req.userId }] },
    ],
  })
    .sort({ created_at: -1 })
    .skip(10 * (1 - 1))
    .limit(10)
    .select(" -__v")
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
// vu messages
router.put("/vu/:userId", authMiddleware, async (req, res) => {
  // await User.find({ _id: req.userId }).updateMany(
  //   { users: { $nin: [req.params.userId] } },
  //   {
  //     $push: {
  //       users: req.params.userId,
  //     },
  //   },
  //   { returnDocument: "after" }
  // );
  // let query = User.find({ _id: req.userId, users: req.params.userId })
  // if (query === 0) {
  //   await User.findByIdAndUpdate(
  //     req.userId,
  //     {
  //       $push: {
  //         users: req.params.userId,
  //       },
  //     },
  //     { returnDocument: "after" }
  //   );
  // }
  Message.updateMany(
    {
      $and: [
        { sender: req.params.userId },
        { recipient: req.userId },
        { statut: "envoyé" },
      ],
    },
    {
      $set: {
        statut: "Vu",
      },
    },
    { returnDocument: "after" }
  )
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server Error" });
    });
});
router.get("/envoye/load", authMiddleware, async (req, res) => {
  Message.find({
    $and: [{ recipient: req.userId }, { statut: "envoyé" }],
  })
    .sort({ created_at: -1 })
    .populate("sender")
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server Error" });
    });
});
router.put("/vu1/:userId", authMiddleware, async (req, res) => {
  const nombmessages = await Message.find({
    $and: [
      { sender: req.params.userId },
      { recipient: req.userId },
      { statut: "envoyé" },
    ],
  }).count();
  User.findByIdAndUpdate(
    req.userId,
    {
      $inc: {
        messagespasvu: -nombmessages,
      },
    },
    { returnDocument: "after" }
  )
    .populate("favoris")
    .populate("users")
    .select("-password -__v")
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server Error" });
    });
});
/* router.put("/add/users/:userId", authMiddleware, async (req, res) => {
  // const exists = await User.findOne(
  //   { _id: req.userId },
  //   { users: req.params.userId }
  // );
  // if (!exists) {
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
  // }
}); */
module.exports = router;
