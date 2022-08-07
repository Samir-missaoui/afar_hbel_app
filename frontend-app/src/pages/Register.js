import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { addImageUser, loading, registerUser } from "../actions/authActions";
import HeroSection from "../components/HeroSection copy";

const Register = () => {
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    age: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [file, setfile] = useState("");
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.msg === "image success") {
      navigat("/home");
    }
    if (auth.error) {
      setErrors(auth.error);
    }
    if (auth.isAuth) {
      handleClickOpen();
    }
  }, [auth.isAuth, auth.error, auth.msg]);
  const handlechange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const registerNow = (e) => {
    e.preventDefault();
    dispatch(registerUser(info));
  };
  const handleClos = () => {
    setOpen(false);
  };
  const handleclick1 = () => {
    dispatch(addImageUser(file));
  };
  const handleClose = () => setOpen(false);
  return (
    <div /* className="display" */ style={{ height: "90vh" }}>
      {/* <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
      <div
      // style={{
      //   width: "70%",
      // }}
      >
        {/* <HeroSection
          video="/Videos/video-1.mp4"
          text="ALLLEEEZZ!!!!"
          text2="Rejoignez-nous!!!"
        /> */}
        <video src="/Videos/video-1.mp4" autoPlay loop muted />
        <h1 className="title">Rejoignez-nous!</h1>
        <form
          onSubmit={registerNow}
          style={({ width: 100 }, { textAlign: "center" })}
        >
          <Card
            style={{ backgroundColor: "transparent" }}
            sx={{ minWidth: 275 }}
            className="background"
          >
            <CardContent>
              <div className="margin">
                <Typography sx={{ fontSize: 28 }} color="white" gutterBottom>
                  <label>Mettez vos coordonnées ici</label>
                </Typography>
              </div>
              <div className="margin">
                <Typography sx={{ fontSize: 24 }} color="white" gutterBottom>
                  <label>Firstname</label>
                </Typography>
                <Typography variant="h5" component="div">
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    name="firstname"
                    onChange={handlechange}
                  />
                </Typography>
                <h1 className="erreur">
                  {errors?.find((el) => el.param === "firstname")?.msg}
                </h1>
              </div>
              <div className="margin">
                <Typography sx={{ fontSize: 24 }} color="white" gutterBottom>
                  <label>Lastname</label>
                </Typography>
                <Typography variant="h5" component="div">
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    name="lastname"
                    onChange={handlechange}
                  />
                </Typography>
                <h1 className="erreur">
                  {errors?.find((el) => el.param === "lastname")?.msg}
                </h1>
              </div>
              <div className="margin">
                <Typography sx={{ fontSize: 24 }} color="white" gutterBottom>
                  <label>Phone</label>
                </Typography>
                <Typography variant="h5" component="div">
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    name="phone"
                    onChange={handlechange}
                  />
                </Typography>
                <h1 className="erreur">
                  {errors?.find((el) => el.param === "phone")?.msg}
                </h1>
              </div>
              <div className="margin">
                <Typography sx={{ fontSize: 24 }} color="white" gutterBottom>
                  <label>Age</label>
                </Typography>
                <Typography variant="h5" component="div">
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    name="age"
                    onChange={handlechange}
                  />
                </Typography>
                <h1 className="erreur">
                  {errors?.find((el) => el.param === "age")?.msg}
                </h1>
              </div>
              <div className="margin">
                <Typography sx={{ fontSize: 24 }} color="white" gutterBottom>
                  <label>Email</label>
                </Typography>
                <Typography variant="h5" component="div">
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    name="email"
                    onChange={handlechange}
                  />
                </Typography>
                <h1 className="erreur">
                  {errors?.find((el) => el.param === "email")?.msg}
                </h1>
              </div>
              <div className="margin">
                <Typography sx={{ fontSize: 24 }} color="white" gutterBottom>
                  <label>Passsword</label>
                </Typography>
                <Typography variant="h5" component="div">
                  <input
                    style={{ textAlign: "center" }}
                    type="password"
                    name="password"
                    onChange={handlechange}
                  />
                </Typography>
                <h1 className="erreur">
                  {errors?.find((el) => el.param === "password")?.msg}
                </h1>
              </div>
            </CardContent>
            <CardActions style={{ alignItems: "center" }}>
              <button
                size="small"
                type="submit"
                style={{ margin: "auto", minWidth: "150px" }}
              >
                Register
              </button>
            </CardActions>
          </Card>
        </form>
        <Dialog open={open} onClose={handleClose} className="annonce_modal">
          <DialogTitle>Photo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ajouter votre photo de profil.
            </DialogContentText>
            <Typography variant="h5" component="div">
              <input
                style={{ color: "white" }}
                type="file"
                name="file"
                onChange={(e) => setfile(e.target.files[0])}
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleclick1}>Ajouter Photo de Profil</Button>
            <Button onClick={handleClos}>Pas maintenant</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
    </div>
  );
};

export default Register;
