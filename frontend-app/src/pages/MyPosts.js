import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getMyPosts } from "../actions/postActions";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Pagination,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { addfavPost, deletefavPost, loading } from "../actions/authActions";

const MyPosts = () => {
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyPosts());
  }, []);
  const [search, setsearch] = useState({
    tri: "",
    currentpage: 1,
    pagesize: 10,
  });
  const handleChangePage = (event, newPage) => {
    setsearch({ ...search, currentpage: newPage });
  };
  const handleChangeRowsPerPage = (event) => {
    setsearch({ ...search, pagesize: Math.abs(event.target.value) });
  };
  return (
    <div>
      <div>
        <video src="/Videos/video-1.mp4" autoPlay loop muted />
        <h1 className="title" style={{ paddingTop: "40px" }}>
          Vos postes
        </h1>
        {post.postList && (
          <>
            {/* <img
              src="http://assets.stickpng.com/images/58aff1e7829958a978a4a6ce.png"
              className="center"
            ></img> */}
            <h3 style={{ textAlign: "center", color: "#f9f5f5" }}>
              Noms des posts{" "}
            </h3>
            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.tri}
                label="Age"
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
            </FormControl> */}
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
                    <div className="flexspacebetween">
                      <h4>{post.prix} DT</h4>
                      {auth.user && auth.user?._id !== post.owner ? (
                        <div className="flexend">
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Stack spacing={2}>
                <Pagination
                  onChange={(event, value) => {
                    setsearch({ ...search, currentpage: value });
                  }}
                  count={Math.ceil(post.countposts / search.pagesize)}
                />
              </Stack>
              <TablePagination
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
      </div>
    </div>
  );
};

export default MyPosts;
