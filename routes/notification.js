const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const User = require("../models/User");
//Ajouter notification
router.post("/", authMiddleware, async (req, res) => {
  let res_obj = {};
  let newNotification = new Notification({
    ...req.body,
    recipient: req.body.recipient,
    post: req.body.postId,
    sender: req.userId,
    statut: "envoyé",
  });
  newNotification.save();
  const second_query = await User.findByIdAndUpdate(
    req.body.recipient,
    {
      $inc: {
        notificationspasvu: +1,
      },
    },
    { returnDocument: "after" }
  );
  res_obj = {
    ...res_obj,
    first_query_res: newNotification,
    second_query_res: second_query,
  };
  res.send(res_obj);
});
router.delete("/delete", authMiddleware, async (req, res) => {
  let query = await Notification.find({
    $and: [{ post: req.query.postId }, { sender: req.userId }],
  }).count();
  if (req.query.recipient === req.userId) {
    await User.findByIdAndUpdate(req.query.recipient, {
      $inc: {
        notificationspasvu: -1,
      },
    });
    Notification.findOneAndDelete({ _id: req.query.notId })
      .then(() => {
        res.status(200).send({ msg: "la notification est effacé avec succès" });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" });
      });
  } else if (req.query.recipient !== req.userId && query === 1) {
    await User.findByIdAndUpdate(req.query.recipient, {
      $inc: {
        notificationspasvu: -1,
      },
    });
    Notification.findOneAndDelete({
      $and: [{ post: req.query.postId }, { sender: req.userId }],
    })
      .then(() => {
        res.status(200).send({ msg: "votre poste est effacé avec succès" });
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send({ msg: "Server Error" });
      });
  } else {
    res.status(200).send({ msg: "votre poste est effacé avec succès" });
  }
});
// load notifications
router.get("/load/", authMiddleware, (req, res) => {
  Notification.find({ recipient: req.userId })
    .sort({ created_at: -1 })
    .populate("sender")
    .populate("post")
    .select(" -__v")
    .then((notif) => {
      if (!notif) {
        return res
          .status(404)
          .json({ msg: "User not found", param: "password" });
      }
      res.status(200).json(notif);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server Error" });
    });
});
module.exports = router;
