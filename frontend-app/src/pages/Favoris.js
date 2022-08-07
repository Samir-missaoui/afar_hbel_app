import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "../styles.css";
import { loadUser } from "../actions/authActions";
import { Link } from "react-router-dom";

const Favoris = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div>
      <div>
        <video src="/Videos/video-1.mp4" autoPlay loop muted />
        <h1 className="title" style={{ paddingTop: "40px" }}>
          Vos postes favoris
        </h1>
        {auth.user && (
          <>
            <h3 style={{ textAlign: "center", color: "#f9f5f5" }}>
              Noms des posts{" "}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 40,
                padding: 40,
              }}
            >
              {auth.user?.favoris?.map((post) => (
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
                            {post.description?.substr(0, 20)}...
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <div className="flexspacebetween">
                      <h4>{post.prix} DT</h4>
                      <div className="flexend">
                        <h6>{post.numbfavs}</h6>
                        <FavoriteIcon
                          style={{
                            color: "red",
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Favoris;
