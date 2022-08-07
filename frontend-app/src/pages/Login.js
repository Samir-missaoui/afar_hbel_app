import React, { useEffect, useState } from "react";
import { loginUser } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent, Typography } from "@mui/material";
import HeroSection from "../components/HeroSection copy";
import "../styles.css";

const Login = () => {
  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const navigat = useNavigate();

  const handlechange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(info));
  };
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isAuth) {
      navigat("/home");
    }
    if (auth.error) {
      setErrors(auth.error);
    }
  }, [auth.isAuth, auth.error]);
  const Eye = () => {
    if (password == "password") {
      setpassword("text");
      seteye(false);
    } else {
      setpassword("password");
      seteye(true);
    }
  };
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };
  const onLeave = () => {
    setHover(false);
  };
  return (
    <div /* className="display" */ style={{ height: "90vh" }}>
      {/* <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
      <div
      // style={{
      //   width: "70%",
      // }}
      >
        {/* <HeroSection
          style={{ height: "100px" }}
          video="/Videos/video-1.mp4"
          text="CHER AMI"
          text2="Binevenue sur votre site préférée"
        /> */}

        <video src="/Videos/video-1.mp4" autoPlay loop muted />
        <h1 className="title">Bienvenue sur votre site préférée</h1>
        <form
          onSubmit={login}
          style={{ textAlign: "center", alignItems: "center" }}
        >
          <Card
            style={{
              backgroundColor: "transparent",
              color: "white",
              maxWidth: "50%",
              margin: "auto",
            }}
            sx={{ minWidth: 275 }}
            className="background"
          >
            <CardContent>
              <div className="margine">
                <Typography sx={{ fontSize: 22 }} color="white" gutterBottom>
                  <label>Accéder à votre compte d'ici</label>
                </Typography>
              </div>
              <div className="margine">
                <Typography sx={{ fontSize: 18 }} color="white" gutterBottom>
                  <label>Email</label>
                </Typography>
                <Typography variant="h5" component="div">
                  <input
                    style={{ textAlign: "center", textAlign: "-webkit-center" }}
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={handlechange}
                  />
                </Typography>
                {errors?.find((el) => el.param === "email")?.msg}
              </div>
              <div className="margine">
                <Typography sx={{ fontSize: 18 }} color="white" gutterBottom>
                  <label>Password</label>
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "-webkit-center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    style={{ textAlign: "center" }}
                    type={password}
                    className="form-control"
                    name="password"
                    onChange={handlechange}
                  />
                  <i onClick={Eye}>
                    {eye ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        role="button"
                        onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                      >
                        {hover ? "SHOW" : "HIDE"}
                      </FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        icon={faEye}
                        role="button"
                        onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                      >
                        {hover ? "SHOW" : "HIDE"}
                      </FontAwesomeIcon>
                    )}
                  </i>
                </Typography>
                {errors?.find((el) => el.param === "password")?.msg}
              </div>
              {/* {errors && errors.map((el) => <p>{el.msg}</p>)} */}
              <div className="form-group">
                {/* <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div> */}
                <button
                  type="submit"
                  className="btn btn-dark btn-lg btn-block"
                  style={{ marginTop: "20px" }}
                >
                  Login
                </button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      {/* <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
    </div>
  );
};

export default Login;
