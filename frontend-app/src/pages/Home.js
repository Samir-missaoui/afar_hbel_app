import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { countPosts, getPosts } from "../actions/postActions";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  addfavPost,
  addNotification,
  deletefavPost,
  deleteNotification,
  loading,
  LoadMessagesEnvoye,
  loadNot,
  loadUser,
} from "../actions/authActions";
import "../components/Cards.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../styles.css";
import Footer from "../components/Footer";
import { CardActionArea, CardMedia } from "@mui/material";

const Home = () => {
  const [search, setsearch] = useState({
    tri: "",
    currentpage: 1,
    pagesize: 10,
  });
  const [notification, setnotification] = useState({
    recipient: "",
    post: "",
  });
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getPosts(search));
    dispatch(countPosts());
    if (auth.token) {
      dispatch(loadUser());
      dispatch(loadNot());

      dispatch(LoadMessagesEnvoye());
    }
  }, [search.currentpage, search.pagesize]);
  useEffect(() => {
    if (auth.msg === "deletesuccess") {
      dispatch(deleteNotification(notification));
    } else if (auth.msg === "addsuccess") {
      dispatch(addNotification(notification));
    }
  }, [auth.msg]);
  useEffect(() => {
    dispatch(getPosts(search));
  }, [search.tri, auth.user]);
  if (!post.postList) {
    return (
      <>
        <video src="/Videos/video-1.mp4" autoPlay loop muted />
        <h1 style={{ paddingTop: "40px" }}>LOADING...</h1>
      </>
    );
  }
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(post.countposts / search.pagesize); i++) {
    pageNumbers.push(i);
  }
  const handleChangePage = (event, newPage) => {
    setsearch({ ...search, currentpage: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setsearch({ ...search, pagesize: Math.abs(event.target.value) });
  };
  return (
    <div>
      {/* <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
      <div
      // className="background"
      // style={{
      //   width: "70%",
      // }}
      >
        {post.postList && (
          <>
            {/* <HeroSection
              video="/Videos/video-1.mp4"
              text="BIENVENUE SUR VOTRE SITE"
              text2="
        Vous ne regretterez pas"
            /> */}
            <video src="/Videos/video-1.mp4" autoPlay loop muted />
            <h1 className="title" style={{ paddingTop: "40px" }}>
              BIENVENUE SUR VOTRE SITE
            </h1>
            <h2
              style={{
                textAlign: "center",
                color: "#f9f5f5",
                marginTop: "40px",
                marginBottom: "40px",
              }}
            >
              Noms des annonces
            </h2>
            <FormControl
              fullWidth
              sx={{ marginLeft: "40px" }}
              className="annonce_modal"
            >
              <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
              <Select
                style={{ maxWidth: "360px" }}
                color="primary"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.tri}
                label="Trier par"
                onChange={(e) => {
                  setsearch({ ...search, tri: e.target.value });
                }}
                // onClick={(e) => {
                //   e.preventDefault();
                //   dispatch(getPosts(search));
                // }}
              >
                <MenuItem value="Date">Date</MenuItem>
                <MenuItem value="Titre">Titre</MenuItem>
                <MenuItem value="Prix">Prix</MenuItem>
                <MenuItem value="Nombre de cœurs">Nombre de cœurs</MenuItem>
              </Select>
            </FormControl>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 40,
                padding: 40,
              }}
            >
              {post.postList.map((post) => (
                <div key={post._id}>
                  {/* <div className="cards">
                    <h1>Check out these EPIC Destinations!</h1>
                    <div className="cards__container">
                      <div className="cards__wrapper">
                        <ul className="cards__items">
                          <CardItem
                            src={post.image}
                            text={post.description}
                            label={post.catégorie}
                            path={`/post/${post._id}`}
                          />
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  <Card sx={{ minWidth: 345, minHeight: 270 }}>
                    <Link to={`/post/${post._id}`}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={post.image?.IMAGE_URL}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            style={{ textDecoration: "none" }}
                          >
                            {post.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {post.description?.substr(0, 20)}...
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <div className="flexspacebetween">
                      <h4>{post.prix} DT</h4>
                      {auth.user && auth.user?._id !== post.owner ? (
                        <div className="flexend">
                          <h6>{post.numbfavs}</h6>
                          <Button
                            disabled={auth.loading}
                            onClick={(e) => {
                              dispatch(loading());
                              auth.user?.favs.includes(post._id)
                                ? dispatch(deletefavPost({ postId: post._id }))
                                : dispatch(
                                    addfavPost({
                                      owner: post.owner,
                                      postId: post._id,
                                    })
                                  );
                              setnotification({
                                ...notification,
                                recipient: post.owner,
                                postId: post._id,
                                notId: post._id,
                              });
                              // setnotifi({
                              //   ...notifi,
                              //   postId: post._id,
                              //   notId: post._id,
                              // });
                            }}
                          >
                            <FavoriteIcon
                              style={{
                                color: auth.user?.favs.includes(post._id)
                                  ? "red"
                                  : "black",
                              }}
                            />
                          </Button>
                        </div>
                      ) : (
                        <div className="flexend">
                          <h6>{post.numbfavs}</h6>

                          <FavoriteIcon
                            style={{
                              color: "red",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                  {/* <Card
                    sx={{ minWidth: 350 }}
                    style={{
                      backgroundColor: "lightgrey",
                    }}
                  >
                    <Link to={`/post/${post._id}`}>
                      <CardContent style={{ textAlign: "center" }}> */}
                  {/* <Favoris />
                  {/* {post.postList && (
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        ></Typography>
                      )} */}
                  {/* <img src={post.image}></img> */}
                  {/* <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          <img src={post.image} width={100} height={100}></img>
                        </Typography>
                        <Typography variant="h5" component="div">
                          {post.title}
                        </Typography>
                        <Typography variant="body2">
                          {post.description.substr(0, 20)}...
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" style={{ textAlign: "center" }}>
                          Lire la suite
                        </Button>
                      </CardActions>
                    </Link>
                    {auth.user && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h1></h1>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <h6>{post.numbfavs}</h6>
                          <Button
                            disabled={auth.loading}
                            onClick={() => {
                              dispatch(loading());
                              auth.user?.favs.includes(post._id)
                                ? dispatch(deletefavPost({ postId: post._id }))
                                : dispatch(addfavPost({ postId: post._id }));
                            }}
                          >
                            <FavoriteIcon
                              style={{
                                color: auth.user?.favs.includes(post._id)
                                  ? "red"
                                  : "black",
                              }}
                            />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card> */}
                </div>
              ))}
            </div>
            <div
              style={{
                color: "white",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Stack spacing={2} className="annonce_modal">
                <Pagination
                  sx={{ color: "#fff !important" }}
                  color="primary"
                  onChange={(event, value) => {
                    setsearch({ ...search, currentpage: value });
                  }}
                  count={Math.ceil(post.countposts / search.pagesize)}
                />
              </Stack>
              <TablePagination
                className="annonce_modal"
                sx={{ color: "#fff !important" }}
                rowsPerPageOptions={[2, 5, 10, 20]}
                component="div"
                count={post.countposts}
                page={search.currentpage}
                onPageChange={handleChangePage}
                rowsPerPage={search.pagesize}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </>
        )}
        {/* <h4 style={{ textAlign: "center" }}>
          Ou choisissez l'un de nos marchés
        </h4>
        {images.map((cat) => (
          <Button
            key={cat.titre}
            name="categorie"
            value={cat.titre}
            onClick={handlechange}
          >
            <Avatar
              src={cat.photo}
              alt={cat.titre}
              sx={{ width: 100, height: 100 }}
            ></Avatar>
          </Button>
        ))} */}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 40,
            padding: 40,
          }}
        >
          {post.searchpost?.map((post) => (
            <div key={post._id}>
              <Card sx={{ minWidth: 345 }}>
                <Link to={`/post/${post._id}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={post.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.description.substr(0, 20)}...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                {auth.user && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h1></h1>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <h6>{post.numbfavs}</h6>
                      <Button
                        disabled={auth.loading}
                        onClick={() => {
                          dispatch(loading());
                          auth.user?.favs.includes(post._id)
                            ? dispatch(deletefavPost({ postId: post._id }))
                            : dispatch(addfavPost({ postId: post._id }));
                        }}
                      >
                        <FavoriteIcon
                          style={{
                            color: auth.user?.favs.includes(post._id)
                              ? "red"
                              : "black",
                          }}
                        />
                      </Button>
                    </div>
                  </div>
                )}
              </Card> */}
        {/* <Card
                sx={{ minWidth: 350 }}
                style={{
                  backgroundColor: "lightgrey",
                }}
              >
                <Link to={`/post/${post._id}`}>
                  <CardContent style={{ textAlign: "center" }}> */}
        {/* <Favoris /> */}
        {/* {post.postList && (
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        ></Typography>
                      )} */}
        {/* <img src={post.image}></img> */}
        {/* <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      <img src={post.image} width={100} height={100}></img>
                    </Typography>
                    <Typography variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2">
                      {post.description.substr(0, 20)}...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" style={{ textAlign: "center" }}>
                      Lire la suite
                    </Button>
                  </CardActions>
                </Link>
                {auth.user && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h1></h1>
                    <Button
                      disabled={auth.loading}
                      onClick={() => {
                        dispatch(loading());
                        auth.user?.favs.includes(post._id)
                          ? dispatch(deletefavPost({ postId: post._id }))
                          : dispatch(addfavPost({ postId: post._id }));
                      }}
                    >
                      <FavoriteIcon
                        style={{
                          color: auth.user?.favs.includes(post._id)
                            ? "red"
                            : "black",
                        }}
                      />
                    </Button>
                  </div>
                )}
              </Card> */}
        {/* </div>
          ))}
        </div> */}
        <Footer />
      </div>
      {/* // <div style={{ width: "15%" }} className="backgroundlateral"></div> */}
    </div>
  );
};

export default Home;
