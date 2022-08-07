const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require("../helpers/authMiddleware");
const User = require("../models/User");
// search posts
router.get("/", (req, res) => {
  const title = req.query.title;
  const categorie = req.query.categorie;
  const souscategorie = req.query.souscategorie;
  const livraison = req.query.livraison;
  const delegation = req.query.delegation;
  const gouvernorat = req.query.gouvernorat;
  Post.find({
    $and: [
      {
        $or: [
          { description: { $regex: title, $options: "i" } },
          { title: { $regex: title, $options: "i" } },
        ],
      },
      { categorie: { $regex: categorie, $options: "i" } },
      { souscategorie: { $regex: souscategorie, $options: "i" } },
      { livraison: { $regex: livraison, $options: "i" } },
      { delegation: { $regex: delegation, $options: "i" } },
      { gouvernorat: { $regex: gouvernorat, $options: "i" } },
    ],
  })
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});
//search users
router.get("/user", (req, res) => {
  const title = req.query.name;
  User.find({
    $or: [
      { firstname: { $regex: title, $options: "i" } },
      { lastname: { $regex: title, $options: "i" } },
    ],
  })
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});
//add searches
router.put("/add", authMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.userId,
    {
      $push: {
        searches: req.body,
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
router.get("/posts", async (req, res) => {
  const title = req.query.title;
  const souscategorie = req.query.souscategorie;
  const categorie = req.query.categorie;
  const livraison = req.query.livraison;
  const delegation = req.query.delegation;
  const gouvernorat = req.query.gouvernorat;
  const prixmin = req.query.prixmin;
  const prixmax = req.query.prixmax;
  let res_obj = {};
  const rech_del_souscat_prix = await Post.find({
    $and: [
      { souscategorie: { $regex: souscategorie, $options: "i" } },
      // { livraison: { $regex: livraison, $options: "i" } },
      { delegation: { $regex: delegation, $options: "i" } },
      { prix: { $gt: prixmin } },
      { prix: { $lt: prixmax } },
    ],
  });
  const rech_gouv_souscat_prix = await Post.find({
    $and: [
      { souscategorie: { $regex: souscategorie, $options: "i" } },
      // { livraison: { $regex: livraison, $options: "i" } },
      { gouvernorat: { $regex: gouvernorat, $options: "i" } },
      { prix: { $gt: prixmin } },
      { prix: { $lt: prixmax } },
    ],
  });
  const rech_tit_souscat_gouv_prix = await Post.find({
    $and: [
      {
        $or: [
          { description: { $regex: title, $options: "i" } },
          { title: { $regex: title, $options: "i" } },
        ],
      },
      { souscategorie: { $regex: souscategorie, $options: "i" } },
      { livraison: { $regex: livraison, $options: "i" } },
      { gouvernorat: { $regex: gouvernorat, $options: "i" } },
      { prix: { $gt: prixmin } },
      { prix: { $lt: prixmax } },
    ],
  });
  const PageSize = req.query.pagesize;
  const CureentPage = req.query.currentpage;
  if (req.query.tri === "Date") {
    var rech_tit_souscat_dele_prix = await Post.find({
      $and: [
        {
          $or: [
            { description: { $regex: title, $options: "i" } },
            { title: { $regex: title, $options: "i" } },
          ],
        },
        { souscategorie: { $regex: souscategorie, $options: "i" } },
        { gouvernorat: { $regex: gouvernorat, $options: "i" } },
        { delegation: { $regex: delegation, $options: "i" } },
        { prix: { $gt: prixmin } },
        { prix: { $lt: prixmax } },
      ],
    }).sort({ created_at: -1 });
  } else if (req.query.tri === "Titre") {
    var rech_tit_souscat_dele_prix = await Post.find({
      $and: [
        {
          $or: [
            { description: { $regex: title, $options: "i" } },
            { title: { $regex: title, $options: "i" } },
          ],
        },
        { souscategorie: { $regex: souscategorie, $options: "i" } },
        { gouvernorat: { $regex: gouvernorat, $options: "i" } },
        { delegation: { $regex: delegation, $options: "i" } },
        { prix: { $gt: prixmin } },
        { prix: { $lt: prixmax } },
      ],
    }).sort({ title: 1 });
  } else if (req.query.tri === "Prix") {
    var rech_tit_souscat_dele_prix = await Post.find({
      $and: [
        {
          $or: [
            { description: { $regex: title, $options: "i" } },
            { title: { $regex: title, $options: "i" } },
          ],
        },
        { souscategorie: { $regex: souscategorie, $options: "i" } },
        { gouvernorat: { $regex: gouvernorat, $options: "i" } },
        { delegation: { $regex: delegation, $options: "i" } },
        { prix: { $gt: prixmin } },
        { prix: { $lt: prixmax } },
      ],
    }).sort({ prix: -1 });
  } else if (req.query.tri === "Nombre de cœurs") {
    var rech_tit_souscat_dele_prix = await Post.find({
      $and: [
        {
          $or: [
            { description: { $regex: title, $options: "i" } },
            { title: { $regex: title, $options: "i" } },
          ],
        },
        { souscategorie: { $regex: souscategorie, $options: "i" } },
        { gouvernorat: { $regex: gouvernorat, $options: "i" } },
        { delegation: { $regex: delegation, $options: "i" } },
        { prix: { $gt: prixmin } },
        { prix: { $lt: prixmax } },
      ],
    }).sort({ numbfavs: -1 });
  } else {
    var rech_tit_souscat_dele_prix = await Post.find({
      $and: [
        {
          $or: [
            { description: { $regex: title, $options: "i" } },
            { title: { $regex: title, $options: "i" } },
          ],
        },
        { souscategorie: { $regex: souscategorie, $options: "i" } },
        { gouvernorat: { $regex: gouvernorat, $options: "i" } },
        { delegation: { $regex: delegation, $options: "i" } },
        { prix: { $gt: prixmin } },
        { prix: { $lt: prixmax } },
      ],
    })
      .skip(PageSize * (CureentPage - 1))
      .limit(PageSize);
  }
  // if (PageSize && CureentPage) {
  //   var rech_tit_souscat_dele_prix
  //     .skip(PageSize * (CureentPage - 1))
  //     .limit(PageSize);
  // }
  // const rech_tit_souscat_dele_prix = await Post.find({
  //   $and: [
  //     {
  //       $or: [
  //         { description: { $regex: title, $options: "i" } },
  //         { title: { $regex: title, $options: "i" } },
  //       ],
  //     },
  //     { souscategorie: { $regex: souscategorie, $options: "i" } },
  //     { gouvernorat: { $regex: gouvernorat, $options: "i" } },
  //     { delegation: { $regex: delegation, $options: "i" } },
  //     { prix: { $gt: prixmin } },
  //     { prix: { $lt: prixmax } },
  //   ],
  // });
  const count_rech_tit_souscat_dele_prix = await Post.find({
    $and: [
      {
        $or: [
          { description: { $regex: title, $options: "i" } },
          { title: { $regex: title, $options: "i" } },
        ],
      },
      { souscategorie: { $regex: souscategorie, $options: "i" } },
      { gouvernorat: { $regex: gouvernorat, $options: "i" } },
      { delegation: { $regex: delegation, $options: "i" } },
      { prix: { $gt: prixmin } },
      { prix: { $lt: prixmax } },
    ],
  }).count();
  const rech_tit_gouv_prix = await Post.find({
    $and: [
      {
        $or: [
          { description: { $regex: title, $options: "i" } },
          { title: { $regex: title, $options: "i" } },
        ],
      },
      // { livraison: { $regex: livraison, $options: "i" } },
      { gouvernorat: { $regex: gouvernorat, $options: "i" } },
      { prix: { $gt: prixmin } },
      { prix: { $lt: prixmax } },
    ],
  });

  const rech_tit_del_prix = await Post.find({
    $and: [
      {
        $or: [
          { description: { $regex: title, $options: "i" } },
          { title: { $regex: title, $options: "i" } },
        ],
      },
      // { livraison: { $regex: livraison, $options: "i" } },
      { delegation: { $regex: delegation, $options: "i" } },
      { prix: { $gt: prixmin } },
      { prix: { $lt: prixmax } },
    ],
  });
  const rech_tit_prix = await Post.find({
    $and: [
      {
        $or: [
          { description: { $regex: title, $options: "i" } },
          { title: { $regex: title, $options: "i" } },
        ],
      },
      { prix: { $gt: prixmin } },
      { prix: { $lt: prixmax } },
    ],
  });
  res_obj = {
    ...res_obj,
    rech_del_souscat_prix_res: rech_del_souscat_prix,
    rech_gouv_souscat_prix_res: rech_gouv_souscat_prix,
    rech_tit_souscat_gouv_prix_res: rech_tit_souscat_gouv_prix,
    rech_tit_souscat_dele_prix_res: rech_tit_souscat_dele_prix,
    count_rech_tit_souscat_dele_prix_res: count_rech_tit_souscat_dele_prix,
    fourth_tit_gouv_prix_res: rech_tit_gouv_prix,
    fourth_tit_del_prix_res: rech_tit_del_prix,
    rech_tit_prix_res: rech_tit_prix,
  };
  res.send(res_obj);
});
module.exports = router;
