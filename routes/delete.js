const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");
const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");
const bcrypt = require("bcryptjs");
const Message = require("../models/Message");

router.delete("/:postid", authMiddleware, async (req, res) => {
  await User.updateMany(
    { favoris: req.params.postid },
    {
      $pull: {
        favoris: req.params.postid,
        favs: req.params.postid,
      },
    },
    { returnDocument: "after" }
  );
  Post.findByIdAndDelete(req.params.postid)
    .then(() => {
      res.status(200).send({ msg: "votre poste est effacé avec succès" });
    })
    .catch((err) => {
      res.status(500).send({ msg: "Server Error" });
    });
});
// router.delete("/", authMiddleware, (req, res) => {
//   User.findOne({ _id: req.userId }).then((user) => {
//     bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
//       /* if (err) {
//         throw err;
//       } else */ if (!isMatch) {
//         return res
//           .status(401)
//           .json({ errors: [{ msg: "Wrong Password", param: "password" }] });
//       } else {
//         Post.deleteMany({ owner: req.userId });
//         User.findByIdAndDelete(req.userId)
//           .then(() => {
//             console.log("success");
//             res.status(200).send({ msg: "succès" });
//           })
//           .catch((err) => {
//             console.error(err.message);
//             res.status(500).send({ msg: "Server Error" });
//           });
//       }
//     });
//   });
// });
router.delete("/", authMiddleware, (req, res) => {
  User.findOne({ _id: req.userId })
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, async (err, isMatch) => {
        /* if (err) {
        throw err;
      } else */ if (!isMatch) {
          return res
            .status(401)
            .json({ errors: [{ msg: "Wrong Password", param: "password" }] });
        } else {
          await Post.deleteMany({ owner: req.userId });
          await Message.deleteMany({
            $or: [{ sender: req.userId }, { recipient: req.userId }],
          });
          await Notification.deleteMany({
            $or: [{ sender: req.userId }, { recipient: req.userId }],
          });
          await User.updateMany(
            { favoris: req.userId },
            {
              $pull: {
                favoris: req.body.postId,
                favs: req.body.postId,
              },
            },
            { returnDocument: "after" }
          );
          var a = await Post.find({ owner: req.userId }).distinct("_id");
          await User.find().updateMany(
            {
              favoris: {
                $in: a,
              },
            },
            {
              $pull: {
                favoris: {
                  $in: a,
                },
                favs: {
                  $in: a,
                },
              },
            },

            { returnDocument: "after" }
          );
          User.findByIdAndDelete(req.userId)
            .then(() => {
              res
                .status(200)
                .send({ msg: "le profil a été supprimé avec succès" });
            })
            .catch((err) => {
              console.error(err.message);
              res.status(500).send({ msg: "Server Error" });
            });
        }
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});
router.put("/ssrfes/cfcvv", authMiddleware, async (req, res) => {
  var a = await Post.find({ owner: req.body.userId }).distinct("_id");
  User.find()
    .updateMany(
      {
        favoris: {
          $in: a,
        },
      },
      {
        $pull: {
          favoris: {
            $in: a,
          },
          favs: {
            $in: a,
          },
        },
      },

      { returnDocument: "after" }
    )
    .then(() => {
      res.status(200).send({ msg: "le profil a été supprimé avec succès" });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

module.exports = router;
