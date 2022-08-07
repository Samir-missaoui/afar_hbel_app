import { Card, CardActionArea, CardContent } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import "../styles.css";

const Mes_Recherches = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div style={{ height: "90vh" }}>
      <div>
        <video src="/Videos/video-1.mp4" autoPlay loop muted />
        <h1 className="title" style={{ paddingTop: "40px" }}>
          Mes recherches
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 40,
            padding: 40,
          }}
        >
          {auth.user?.searches?.map((search) => (
            <div key={search._id}>
              <Card sx={{ minWidth: 345, minHeight: 270, maxWidth: 345 }}>
                {/* <Link to={`/post/${post._id}`}> */}
                <CardActionArea>
                  <CardContent>
                    {search.title?.length <= 20 ? (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        titre: {search.title}
                      </h4>
                    ) : (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        titre: {search.title?.substr(0, 20)}...
                      </h4>
                    )}
                    {search.categorie?.length <= 20 ? (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        catégorie: {search.categorie}
                      </h4>
                    ) : (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        catégorie: {search.categorie?.substr(0, 20)}...
                      </h4>
                    )}
                    {search.souscategorie?.length <= 20 ? (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        sous catégorie: {search.souscategorie}
                      </h4>
                    ) : (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        sous catégorie: {search.souscategorie?.substr(0, 20)}...
                      </h4>
                    )}
                    {search.gouvernorat?.length <= 20 ? (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        gouvernorat: {search.gouvernorat}
                      </h4>
                    ) : (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        gouvernorat: {search.gouvernorat?.substr(0, 20)}...
                      </h4>
                    )}
                    {search.delegation?.length <= 20 ? (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        délegation: {search.delegation}
                      </h4>
                    ) : (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        délegation: {search.delegation?.substr(0, 20)}...
                      </h4>
                    )}

                    {search.prixmin === 0 ? (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        prixmin:
                      </h4>
                    ) : (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        prixmin: {search.prixmin}
                      </h4>
                    )}
                    {search.prixmax === 2000000000000000 ? (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        prixmax:
                      </h4>
                    ) : (
                      <h4
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textDecoration: "none" }}
                      >
                        prixmax: {search.prixmax}
                      </h4>
                    )}
                    <h4
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ textDecoration: "none" }}
                    >
                      livraison: {search.livraison}
                    </h4>
                  </CardContent>
                </CardActionArea>
                {/* </Link> */}
              </Card>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Mes_Recherches;
