import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteUser,
  loadUser,
  loadUserbyid,
  updatePassword,
  updateUser,
} from "../actions/authActions";
import format from "date-fns/format";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import "../styles.css";
import "../components/HeroSectioncopy.css";
// import HeroSection from "../components/HeroSection copy";

const Profile = () => {
  const navigat = useNavigate();
  const [errors, setErrors] = useState(null);
  const [update, setupdate] = useState(null);
  const [security, setsecurity] = useState(null);
  const auth = useSelector((state) => state.auth);
  const [info, setInfo] = useState({
    firstname: auth.user?.firstname,
    lastname: auth.user?.lastname,
    phone: auth.user?.phone,
    age: auth.user?.age,
    email: auth.user?.email,
    password: null,
    email1: auth.user?.email,
  });
  const [changepassword, setchangepassword] = useState({
    newpassword: null,
    confirmnewpassword: null,
    password: null,
    email: null,
  });
  useEffect(() => {
    if (auth.msg?.msg === "le profil a été supprimé avec succès") {
      navigat("/home");
    }
    if (auth.msg === "update success") {
      dispatch(loadUser());
      dispatch(loadUserbyid(userId));
      setOpen2(false);
      setOpen(false);
      setOpen3(false);
      setOpen4(false);
    }
  }, [auth.msg]);
  const handlechange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handlechange2 = (e) => {
    setchangepassword({ ...changepassword, [e.target.name]: e.target.value });
  };
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClos = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClos2 = () => {
    setOpen2(false);
  };
  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClickOpen4 = () => {
    setOpen4(true);
  };
  const handleClos3 = () => {
    setOpen3(false);
  };
  const handleClos4 = () => {
    setOpen4(false);
  };
  useEffect(() => {
    if (auth.error) {
      setErrors(auth.error);
    }
  }, [auth.error, auth.isAuth]);
  useEffect(() => {
    dispatch(loadUserbyid(userId));
  }, []);
  const updateNow = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, info));
  };
  const updatePassNow = (e) => {
    e.preventDefault();
    dispatch(updatePassword(userId, changepassword));
  };
  const deleteuserNow = (e) => {
    e.preventDefault();
    dispatch(deleteUser(info));
  };
  if (!auth.userbyid) {
    return "...loading";
  }
  return (
    <div /* className="display" */ style={{ height: "90vh" }}>
      {/* <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
      <div
      // className="background"
      // style={{
      //   width: "70%",
      // }}
      >
        {/* <HeroSection video="/Videos/video-1.mp4" /> */}
        <video src="/Videos/video-1.mp4" autoPlay loop muted />
        {auth.user?._id === auth.userbyid?._id ? (
          <h1 className="title">Ceci est votre profil</h1>
        ) : (
          <h1 className="title">Ceci est le profil demandé</h1>
        )}
        <div className="flex">
          <img
            src={auth.userbyid?.image.IMAGE_URL}
            alt="Profile Image"
            className="child"
            width={180}
            height={360}
            style={{ width: "360px" }}
            s
          ></img>
          <div className="grid-container">
            <h1 className="grid-item">Nom</h1>
            <h1 className="grid-item" /* style={{ marginTop: "200px" }} */>
              {auth.userbyid?.firstname}
            </h1>
            <h1 className="grid-item">Prénom</h1>
            <h1 className="grid-item">{auth.userbyid?.lastname}</h1>
            <h1 className="grid-item">Téléphone</h1>
            <h1 className="grid-item">{auth.userbyid?.phone}</h1>
            <h1 className="grid-item">Age</h1>
            <h1 className="grid-item">{auth.userbyid?.age}</h1>
            <h1 className="grid-item">Email</h1>
            <h1 className="grid-item">{auth.userbyid?.email}</h1>
            <h1 className="grid-item">Crée le</h1>
            <h1 className="grid-item">
              {format(new Date(auth.userbyid.created_at), "dd/MM/yyyy")}
            </h1>
          </div>
          {/* <div className="hero-btns">
            <Buttoncopy
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
            >
              xcfgheryhety
            </Buttoncopy>
          </div>
          <div className="hero-btns">
            <Buttoncopy
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              >
              xcfgheryhety
              </Buttoncopy>
            </div> */}
        </div>
        <div className="flexarround">
          {auth.user?._id === auth.userbyid?._id ? (
            <div className="box-3">
              <div
                className="btn btn-three"
                as="button"
                onClick={handleClickOpen}
              >
                Modifier les informations de votre compte
              </div>
            </div>
          ) : null}
          {auth.user?._id === auth.userbyid?._id ? (
            <div className="box-1">
              <div
                className="btn btn-one"
                onClick={handleClickOpen4}
                as="button"
              >
                <span>Supprimer votre compte</span>
              </div>
            </div>
          ) : null}
        </div>
        {/* <div style={{ textAlign: "center" }}>
          
          {auth.user?._id === auth.userbyid?._id ? (
            <Buttoncopy
              type="submit"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              onClick={handleClickOpen}
              className="grid-item"
            >
              Modifier les informations de votre compte
            </Buttoncopy>
          ) : null}
          {auth.user?._id === auth.userbyid?._id ? (
            <Buttoncopy
              variant="contained"
              color="secondary"
              type="submit"
              className="grid-item"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              onClick={handleClickOpen4}
            >
              Supprimer votre compte
            </Buttoncopy>
          ) : null}
        </div> */}
        {/* <Card
          sx={{ minWidth: "100%" }}
          style={{
            backgroundColor: "#99cc99",
            height: "90vh",
            textAlign: "center",
          }}
          className="background"
        >
          <CardContent> */}
        {/* <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {auth.user && <p>{auth.user.firstname}</p>}
            </Typography>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {auth.user && <p>{auth.user.lastname}</p>}{" "}
            </Typography>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {auth.user && <p>{auth.user.phone}</p>}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {auth.user && <p>{auth.user.age}</p>}
            </Typography>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {auth.user && <p>{auth.user.email}</p>}
            </Typography>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {auth.userbyid && (
                <p>
                  {format(new Date(auth.userbyid.created_at), "MM/dd/yyyy")}
                </p>
              )}{" "}
            </Typography> */}
        {/* <CardActions
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {auth.user?._id === auth.userbyid?._id ? (
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={handleClickOpen}
                >
                  Modifier les informations de votre compte
                </Button>
              ) : null}
              {auth.user?._id === auth.userbyid?._id ? (
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={handleClickOpen4}
                >
                  Supprimer votre compte
                </Button>
              ) : null}
            </CardActions>
          </CardContent>
        </Card> */}
        <Dialog open={open4} onClose={handleClos4} className="annonce_modal">
          <DialogTitle>Confiration</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir supprimer votre compte, si oui, tapez
              votre mot de passe pour confirmer
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="standard"
              onChange={handlechange}
            />
            {errors?.find((el) => el.param === "password")?.msg}
            {errors?.find(
              (el) =>
                el.param === "phone" ||
                "email" ||
                "firstname" ||
                "lastname" ||
                "age"
            ) ? (
              <p>vérifier vos coordonnées</p>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClos4}>Cancel</Button>
            <Link
              to="/home"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button onClick={deleteuserNow}>Modifier</Button>
            </Link>
          </DialogActions>
        </Dialog>
        <Dialog open={open} onClose={handleClos} className="annonce_modal">
          <DialogTitle>Subscribe</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                setupdate("coordonnées");
              }}
            >
              modifier vos coordonnées
            </Button>
            <Button
              onClick={() => {
                setupdate("sécurité");
              }}
            >
              modifier votre email ou mot de passe
            </Button>
          </DialogActions>
          {update === "coordonnées" ? (
            <DialogContent>
              <DialogContentText>Modifier vos coordonnées</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Prénom"
                type="prénom"
                name="firstname"
                fullWidth
                variant="standard"
                onChange={handlechange}
              />
              {errors?.find((el) => el.param === "firstname")?.msg}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="lastname"
                label="Nom"
                type="nom"
                fullWidth
                variant="standard"
                onChange={handlechange}
              />
              {errors?.find((el) => el.param === "lastname")?.msg}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="phone"
                label="Phone"
                type="phone"
                fullWidth
                variant="standard"
                onChange={handlechange}
              />
              {errors?.find((el) => el.param === "phone")?.msg}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Age"
                name="age"
                type="age"
                fullWidth
                variant="standard"
                onChange={handlechange}
              />
              {errors?.find((el) => el.param === "age")?.msg}
            </DialogContent>
          ) : update === "sécurité" ? (
            <DialogContent>
              <DialogContentText>
                Modifier votre email ou mot de passe{" "}
              </DialogContentText>
              <Button
                onClick={() => {
                  setsecurity("email");
                }}
              >
                modifier votre email
              </Button>
              <Button
                onClick={() => {
                  setsecurity("password");
                }}
              >
                modifier votre mot de passe
              </Button>
              {security === "email" ? (
                <DialogContent>
                  <DialogContentText>
                    Modifier vos coordonnées
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nouvel adresse e-mail"
                    name="email"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={handlechange}
                  />
                  {errors?.find((el) => el.param === "email")?.msg}
                </DialogContent>
              ) : security === "password" ? (
                <DialogContent>
                  <DialogContentText>
                    Modifier vos coordonnées
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="entrer votre nouveau mot de passe"
                    type="password"
                    name="newpassword"
                    fullWidth
                    variant="standard"
                    onChange={handlechange2}
                  />
                  {errors?.find((el) => el.param === "firstname")?.msg}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="confirmnewpassword"
                    label="confirmer votre nouveau mot de passe"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={handlechange2}
                  />
                  {errors?.find((el) => el.param === "lastname")?.msg}
                </DialogContent>
              ) : null}
            </DialogContent>
          ) : null}
          <DialogActions>
            <Button onClick={handleClos}>Cancel</Button>
            {update === "coordonnées" || security === "email" ? (
              <Button onClick={handleClickOpen2}>
                {/* <Link
              to="/home"
              style={{ color: "inherit", textDecoration: "inherit" }}
            > */}
                Modifier
                {/* </Link> */}
              </Button>
            ) : security === "password" ? (
              <Button onClick={handleClickOpen3}>
                {/* <Link
              to="/home"
              style={{ color: "inherit", textDecoration: "inherit" }}
            > */}
                Modifier
                {/* </Link> */}
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
        <Dialog open={open2} onClose={handleClos2} className="annonce_modal">
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour confirmer vos changements entrer votre mot de passe
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="standard"
              onChange={handlechange}
            />
            {errors?.find((el) => el.param === "password")?.msg}
            {errors?.find(
              (el) =>
                el.param === "phone" ||
                "email" ||
                "firstname" ||
                "lastname" ||
                "age"
            ) ? (
              <p>vérifier vos coordonnées</p>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClos2}>Cancel</Button>
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
        <Dialog open={open3} onClose={handleClos3} className="annonce_modal">
          <DialogTitle>Confiration</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour confirmer vos changements entrer votre mot de passe
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="standard"
              onChange={handlechange2}
            />
            {errors?.find((el) => el.param === "password")?.msg}
            {errors?.find(
              (el) =>
                el.param === "phone" ||
                "email" ||
                "firstname" ||
                "lastname" ||
                "age"
            ) ? (
              <p>vérifier vos coordonnées</p>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClos3}>Cancel</Button>
            <Button onClick={updatePassNow}>
              {/* <Link
              to="/home"
              style={{ color: "inherit", textDecoration: "inherit" }}
            > */}
              Modifier
              {/* </Link> */}
            </Button>
          </DialogActions>
        </Dialog>
      </div>{" "}
      {/* <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
    </div>
  );
};

export default Profile;
