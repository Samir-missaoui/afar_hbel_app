import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost, updatePost } from "../actions/postActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
} from "@mui/material";
import "../styles.css";
import "../butttton.css";
import { format } from "date-fns";
const Postdesc = () => {
  const navigat = useNavigate();
  const post = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  const [errors, setErrors] = useState(null);
  const [info, setInfo] = useState({
    title: post.postdesc?.title,
    description: post.postdesc?.description,
    prix: post.postdesc?.prix,
  });
  const handlechange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (post.error) {
      setErrors(post.error);
    }
  }, [post.error, post.isAuth]);
  useEffect(() => {
    if (post.msg?.msg === "votre poste est effacé avec succès") {
      navigat("/home");
    }
  }, [post.msg]);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setInfo({
      ...info,
      title: post.postdesc?.title,
      description: post.postdesc?.description,
      prix: post.postdesc?.prix,
    });
  };
  const handleClos = () => {
    setOpen(false);
  };
  const { postid } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(postid));
  }, []);
  const handleclick = () => {
    dispatch(deletePost(postid));
  };
  const updateNow = (e) => {
    e.preventDefault();
    dispatch(updatePost(postid, info));
  };
  if (!post.postdesc) {
    return "...loading";
  }
  return (
    <div /* className="display" */ style={{ height: "90vh" }}>
      {/* <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
      <div
      // className="background"
      // style={{
      //    width: "70%"  , display: "flex", justifyContent: "center" ,
      // }}
      >
        <>
          {/* <HeroSection
            video="/Videos/video-1.mp4"
            text="L'ANNNNONCE "
            text2="
        Découvrez l'annonce ci-dessous"
          /> */}
          <video src="/Videos/video-1.mp4" autoPlay loop muted />
          <h1 className="title">Découvrez l'annonce ci-dessous!</h1>
          <div className="flex">
            <img
              className="child"
              src={post.postdesc?.image.IMAGE_URL}
              width={180}
              height={360}
              alt="Post Image"
              // class="center"
              style={{ width: "360px" }}
            ></img>
            <div className="grid-container">
              <h1 className="grid-item">Titre</h1>
              <h1 className="grid-item" /* style={{ marginTop: "200px" }} */>
                {post.postdesc.title}
              </h1>
              <h1 className="grid-item">Description</h1>
              <h1 className="grid-item">{post.postdesc.description}</h1>
              <h1 className="grid-item">Catégorie</h1>
              <h1 className="grid-item">{post.postdesc.categorie}</h1>
              <h1 className="grid-item">Sous Catégorie</h1>
              <h1 className="grid-item">{post.postdesc.souscategorie}</h1>
              <h1 className="grid-item">Gouvernorat</h1>
              <h1 className="grid-item">{post.postdesc.gouvernorat}</h1>
              <h1 className="grid-item">Délégation</h1>
              <h1 className="grid-item">{post.postdesc.delegation}</h1>
              <h1 className="grid-item">Livraison</h1>
              <h1 className="grid-item">{post.postdesc.livraison}</h1>
              <h1 className="grid-item">Prix</h1>
              <h1 className="grid-item">{post.postdesc.prix}</h1>
              <h1 className="grid-item">Favoris</h1>
              <h1 className="grid-item">{post.postdesc.numbfavs}</h1>
              <h1 className="grid-item">Crée le</h1>
              <h1 className="grid-item">
                {format(new Date(post.postdesc.created_at), "H:m, dd/MM/yyyy ")}
              </h1>
            </div>
          </div>
          <div className="flexarround">
            {auth.user && auth.user?._id === post.postdesc?.owner ? (
              <div className="box-2">
                <div
                  className="btn btn-two"
                  as="button"
                  onClick={handleClickOpen}
                >
                  <span>Modifier votre poste</span>
                </div>
              </div>
            ) : null}
            {auth.token && auth.user?._id !== post.postdesc?.owner ? (
              <div className="box-3">
                <Link
                  to={`/profile/${post.postdesc?.owner}`}
                  key={post.postdesc?.owner}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <div className="btn btn-three">Découvrir le vendeur</div>
                </Link>
              </div>
            ) : null}
            {auth.token && auth.user?._id !== post.postdesc?.owner ? (
              <div className="box-3">
                <Link
                  to={`/profile/${post.postdesc?.owner}`}
                  key={post.postdesc?.owner}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <div className="btn btn-three">
                    Contacter le vendeur par message
                  </div>
                </Link>
              </div>
            ) : null}
            {!auth.token ? (
              <div className="box-3">
                <Link
                  to={`/login`}
                  key={post.postdesc?.owner}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <div className="btn btn-three">
                    se connecter pour contacter le vendeur
                  </div>
                </Link>
              </div>
            ) : null}
            {/* ) : <Link to="/home" style={{ textDecoration: "none" }}>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleclick}
              >
                Delete votre poste
              </Button>
            </Link>
            null} */}
            {auth.user && auth.user?._id === post.postdesc?.owner ? (
              <div className="box-1">
                <div className="btn btn-one" onClick={handleclick} as="button">
                  <span>supprimer votre poste</span>
                </div>
              </div>
            ) : null}
          </div>
          {/* <Card
            sx={{ minWidth: "100%" }}
            style={{ height: "90vh", backgroundColor: "transparent" }}
            className="background"
          >
            <CardContent style={{ textAlign: "center" }}>
              {post.postdesc && (
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <img src={post.postdesc.image} width={350} height={350}></img>
                </Typography>
              )}
              {post.postdesc && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Title
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.title}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Description
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.description}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Catégorie
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.categorie}
                      {post.postdesc.souscategorie}
                      {post.postdesc.gouvernorat}
                      {post.postdesc.delegation}
                      {post.postdesc.livraison}
                      {post.postdesc.prix}
                      {post.postdesc.numbfavs}
                      {post.postdesc.created_at}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Sous Catégorie
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.categorie}
                      {post.postdesc.souscategorie}
                      {post.postdesc.gouvernorat}
                      {post.postdesc.delegation}
                      {post.postdesc.livraison}
                      {post.postdesc.prix}
                      {post.postdesc.numbfavs}
                      {post.postdesc.created_at}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Gouvernorat
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.categorie}
                      {post.postdesc.souscategorie}
                      {post.postdesc.gouvernorat}
                      {post.postdesc.delegation}
                      {post.postdesc.livraison}
                      {post.postdesc.prix}
                      {post.postdesc.numbfavs}
                      {post.postdesc.created_at}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Délégation
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.categorie}
                      {post.postdesc.souscategorie}
                      {post.postdesc.gouvernorat}
                      {post.postdesc.delegation}
                      {post.postdesc.livraison}
                      {post.postdesc.prix}
                      {post.postdesc.numbfavs}
                      {post.postdesc.created_at}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Livraison
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.categorie}
                      {post.postdesc.souscategorie}
                      {post.postdesc.gouvernorat}
                      {post.postdesc.delegation}
                      {post.postdesc.livraison}
                      {post.postdesc.prix}
                      {post.postdesc.numbfavs}
                      {post.postdesc.created_at}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Prix
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.categorie}
                      {post.postdesc.souscategorie}
                      {post.postdesc.gouvernorat}
                      {post.postdesc.delegation}
                      {post.postdesc.livraison}
                      {post.postdesc.prix}
                      {post.postdesc.numbfavs}
                      {post.postdesc.created_at}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Favoris
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.categorie}
                      {post.postdesc.souscategorie}
                      {post.postdesc.gouvernorat}
                      {post.postdesc.delegation}
                      {post.postdesc.livraison}
                      {post.postdesc.prix}
                      {post.postdesc.numbfavs}
                      {post.postdesc.created_at}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: 50,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      Crée le
                    </Typography>
                    <Typography
                      sx={{ fontSize: 25 }}
                      color="white"
                      gutterBottom
                    >
                      {post.postdesc.categorie}
                      {post.postdesc.souscategorie}
                      {post.postdesc.gouvernorat}
                      {post.postdesc.delegation}
                      {post.postdesc.livraison}
                      {post.postdesc.prix}
                      {post.postdesc.numbfavs}
                      {post.postdesc.created_at}
                    </Typography>
                  </div>
                </>
              )}
            </CardContent>
            <CardActions
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {auth.user?._id === post.postdesc?.owner ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClickOpen}
                >
                  Modifier votre poste
                </Button>
              ) : null}
              {post.postdesc?.owner === auth.user?._id ? (
                <Link to="/home" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleclick}
                  >
                    Delete
                  </Button>
                </Link>
              ) : null}
            </CardActions>
          </Card> */}
        </>
      </div>
      {/* <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
      <Dialog open={open} onClose={handleClos} className="annonce_modal">
        <DialogTitle>Modifier vos coordonnées</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="titre"
            type="titre"
            name="title"
            fullWidth
            variant="standard"
            onChange={handlechange}
          />
          <h1 className="erreur">
            {errors?.find((el) => el.param === "title")?.msg}
          </h1>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="description"
            type="description"
            fullWidth
            variant="standard"
            onChange={handlechange}
          />
          <h1 className="erreur">
            {errors?.find((el) => el.param === "description")?.msg}
          </h1>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Prix"
            name="Prix"
            type="Prix"
            fullWidth
            variant="standard"
            onChange={handlechange}
          />
          <h1 className="erreur">
            {errors?.find((el) => el.param === "prix")?.msg}
          </h1>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClos}>Cancel</Button>
          <Button onClick={updateNow}>
            {/* <Link
              to="/home"
              style={{ color: "inherit", textDecoration: "inherit" }}
            > */}
            Modifier
            {/* </Link> */}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Postdesc;
