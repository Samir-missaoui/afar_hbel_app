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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { addfavPost, deletefavPost, loading } from "../actions/authActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Footer from "../components/Footer";
import { searchPost } from "../actions/postActions";

const Rechercher = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  // searchParams.get("__firebase_request_key");

  const [search, setsearch] = useState({
    title: currentParams?.title,
    categorie: currentParams?.categorie,
    souscategorie: currentParams?.souscategorie,
    livraison: currentParams?.livraison,
    delegation: currentParams?.delegation,
    gouvernorat: currentParams?.gouvernorat,
    prixmin: currentParams?.prixmin,
    prixmax: currentParams?.prixmax,
    tri: currentParams?.tri,
    currentpage: currentParams?.currentpage,
    pagesize: currentParams?.pagesize,
  });
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(searchPost(search));
    // dispatch(countPosts());
  }, [search.currentpage, search.pagesize]);
  // const [search, setsearch] = useState({
  //   tri: "",
  //   currentpage: 1,
  //   pagesize: 10,
  // });
  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(post.countposts / search.pagesize); i++) {
  //   pageNumbers.push(i);
  // }
  const handleChangePage = (event, newPage) => {
    setsearch({ ...search, currentpage: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setsearch({ ...search, pagesize: Math.abs(event.target.value) });
  };
  if (!post.searchpost) {
    return (
      <>
        <video src="/Videos/video-1.mp4" autoPlay loop muted />
        <h1 style={{ paddingTop: "40px" }}>LOADING...</h1>
      </>
    );
  }
  return (
    <div>
      <div>
        {post.searchpost && (
          <>
            <video src="/Videos/video-1.mp4" autoPlay loop muted />
            <h1 className="title" style={{ paddingTop: "40px" }}>
              VOTRE RECHERCHE
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 40,
                padding: 40,
              }}
            >
              {post.searchpost?.rech_tit_souscat_dele_prix_res.map((post) => (
                <div key={post._id}>
                  <Card sx={{ minWidth: 345, minHeight: 270 }}>
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
                            {post.description?.substr(0, 20)}...
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <div className="flexspacebetween">
                      <h4>{post.prix}DT</h4>
                      {auth.user && (
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
                      )}
                    </div>
                  </Card>
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
              <Stack spacing={2}>
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
        <Footer />
      </div>
    </div>
  );
};

export default Rechercher;
