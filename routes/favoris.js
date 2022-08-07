const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const Post = require("../models/Post");
const router = express.Router();
const User = require("../models/User");
// router.put("/", authMiddleware, (req, res) => {
//   Post.findByIdAndUpdate(req.body.postId, {
//     $inc: { numbfavs: 1 },
//   });
//   User.findByIdAndUpdate(
//     req.userId,
//     {
//       $push: {
//         favoris: req.body.postId,
//         favs: req.body.postId,
//       },
//     },
//     { returnDocument: "after" }
//   )
//     .select("-password -__v")
//     .then((user) => res.status(201).send(user))
//     .catch((err) => {
//       console.error(err.message);
//       res.status(500).send({ msg: "server Error" });
//     });
// });
router.put("/", authMiddleware, async (req, res) => {
  let res_obj = {};
  const first_query = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $inc: { numbfavs: 1 },
    },
    { returnDocument: "after" }
  );
  const second_query = await User.findByIdAndUpdate(
    req.userId,
    {
      $push: {
        favoris: req.body.postId,
        favs: req.body.postId,
      },
    },
    { returnDocument: "after" }
  );
  // const user = await Post.findById(req.body.postId).select(
  //   "-title -categorie -souscategorie -description -delegation -gouvernorat -livraison -prix -created_at -numbfavs -image -_id"
  // );
  // const third_query = await User.findByIdAndUpdate(
  //   user.owner,
  //   {
  //     $push: {
  //       notifications: req.userId,
  //     },
  //   },
  //   { returnDocument: "after" }
  // ).populate("notifications");
  res_obj = {
    ...res_obj,
    first_query_res: first_query,
    second_query_res: second_query,
    // third_query_res: third_query,
  };
  res.send(res_obj);
  // .select("-password -__v")
  // .then((user) => res.status(201).send(user))
  // .catch((err) => {
  //   console.error(err.message);
  //   res.status(500).send({ msg: "server Error" });
  // });
});
router.put("/delete", authMiddleware, async (req, res) => {
  let res_obj = {};
  const first_query = await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $inc: { numbfavs: -1 },
    },
    { returnDocument: "after" }
  );
  const second_query = await User.findByIdAndUpdate(
    req.userId,
    {
      $pull: {
        favoris: req.body.postId,
        favs: req.body.postId,
      },
    },
    { returnDocument: "after" }
  );
  res_obj = {
    ...res_obj,
    first_query_res: first_query,
    second_query_res: second_query,
  };
  res.send(res_obj);
});
module.exports = router;
