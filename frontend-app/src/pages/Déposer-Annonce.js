import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { post } from "../../../backend/routes/register";
import { AddPostImage, addPostInfo } from "../actions/postActions";
import {
  ariana,
  Autres,
  beja,
  benarous,
  bizerte,
  categorie,
  Emploi,
  Entreprises,
  gabès,
  gafsa,
  gouvernora,
  Habillement,
  Immobiliers,
  Informatique,
  jendouba,
  kairouane,
  kasserine,
  kef,
  kébili,
  Loisirs,
  mahdia,
  Maison,
  manouba,
  medennine,
  monastir,
  nabeul,
  sfax,
  sidibouzid,
  siliana,
  sousse,
  tatouine,
  tozeur,
  tunis,
  Vehicules,
  zagouane,
} from "../data";
import "../styles.css";

const Déposer_Annonce = () => {
  const auth = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);
  const [file, setfile] = useState("");
  const [info, setInfo] = useState({
    title: "",
    description: "",
    categorie: "",
    souscategorie: "",
    delegation: "",
    gouvernorat: "",
    prix: "",
    owner: auth.user?._id,
  });
  const [info1, setInfo1] = useState({
    PostId: post.postList?._id,
    livraison: "",
  });
  const [dialog, setdialog] = useState("pres1");
  const [souscategorie, setsouscategorie] = useState("");
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  // const navigat = useNavigate();
  useEffect(() => {
    if (post.msg === "success") {
      setdialog("pres2");
      setInfo1({ ...info1, PostId: post.searchpost?._id });
    }
    if (post.msg === "successss") {
      setdialog("pres3");
    }
    // if (post.postList) {
    //   setInfo1({ ...info1, [PostId]: post.postList?._id });
    // }
    if (post.error) {
      setErrors(post.error);
      //   setTimeout(() => {
      //     setErrors(null);
      //   }, 5000);
    }
  }, [post.error, post.msg]);
  const handlechange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const AddImage = (e) => {
    e.preventDefault();
    dispatch(AddPostImage({ info1, file }));
  };
  const addpostinfo = (e) => {
    e.preventDefault();
    dispatch(addPostInfo(info));
    // setOpen2(true);
  };
  // const handleChange = (event) => {
  //   setInfo(event.target.value);
  // };
  // const handleclick = () => {
  //   setdialog("pres2");
  // };
  // const handleclick1 = () => {
  //   setdialog("pres3");
  // };
  const [open2, setOpen2] = React.useState(false);
  // const handleClickOpen2 = () => {
  //   setOpen2(true);
  // };
  const handleClos2 = () => {
    setOpen2(false);
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
          video="/Videos/video-1.mp4"
          text="ALLLLLEZ! ANNONCER"
          text2="Déposez votre annonce ici"
        /> */}
        <video src="/Videos/video-1.mp4" autoPlay loop muted />
        <h1 className="title">Déposez votre annonce ici</h1>
        <form
          /* onSubmit={postNow} */ style={{
            height: "90vh",
            textAlign: "center",
            backgroundColor: "transparent",
            color: "white",
          }}
          className="background"
        >
          {/* <div className="form-group">
        <h2>Ajouter une annonce</h2>
        <h3>Information générale</h3>
        <label>Title</label>
        <input
          type="text"
          name="title"
          placeholder="Titre de votre annonce..."
          className="form-control"
          onChange={handlechange}
        />
      </div>
      <div className="form-group">
        <label>description</label>
        <input
          type="text"
          name="description"
          placeholder="Ex: Je mets en vente"
          className="form-control"
          onChange={handlechange}
        />
      </div>
      <button type="submit">POST</button>
      {errors && errors.map((el) => <h1>{el.msg}</h1>)} */}
          {dialog === "pres1" ? (
            <DialogContent className="annonce_modal" sx={{ color: "white" }}>
              <h3 style={{ color: "white" }}>
                Ajouter les informations de votre poste
              </h3>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                placeholder="Titre de votre annonce..."
                label="Title"
                type="title"
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
                placeholder="Ex: Je mets en vente..."
                id="name"
                name="description"
                label="Description"
                type="description"
                fullWidth
                variant="standard"
                onChange={handlechange}
              />
              <h1 className="erreur">
                {errors?.find((el) => el.param === "description")?.msg}
              </h1>
              <h4 style={{ marginTop: "30px" }}>Catégorie</h4>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
                <span className="opps"></span>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={info.categorie}
                  onChange={(e) => {
                    setInfo({ ...info, categorie: e.target.value });
                    setsouscategorie(e.target.value);
                  }}
                >
                  {categorie.map((el) => (
                    <MenuItem value={el}>{el}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <h1 className="erreur">
                {errors?.find((el) => el.param === "categorie")?.msg}
              </h1>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  sous catégorie
                </InputLabel>
                {souscategorie === "Véhicules" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.souscategorie}
                    label="sous catégorie"
                    onChange={(e) => {
                      setInfo({ ...info, souscategorie: e.target.value });
                    }}
                  >
                    {Vehicules.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : souscategorie === "Immobiliers" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.souscategorie}
                    label="sous catégorie"
                    onChange={(e) => {
                      setInfo({ ...info, souscategorie: e.target.value });
                    }}
                  >
                    {Immobiliers.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : souscategorie === "Informatique & Multimedia" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.souscategorie}
                    label="sous catégorie"
                    onChange={(e) => {
                      setInfo({ ...info, souscategorie: e.target.value });
                    }}
                  >
                    {Informatique.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : souscategorie === "Pour la maison et jardin" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.souscategorie}
                    label="sous catégorie"
                    onChange={(e) => {
                      setInfo({ ...info, souscategorie: e.target.value });
                    }}
                  >
                    {Maison.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : souscategorie === "Emploi & Services" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.souscategorie}
                    label="sous catégorie"
                    onChange={(e) => {
                      setInfo({ ...info, souscategorie: e.target.value });
                    }}
                  >
                    {Emploi.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : souscategorie === "Entreprises" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.souscategorie}
                    label="sous catégorie"
                    onChange={(e) => {
                      setInfo({ ...info, souscategorie: e.target.value });
                    }}
                  >
                    {Entreprises.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : souscategorie === "Habillement & Bien Etre" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.souscategorie}
                    label="sous catégorie"
                    onChange={(e) => {
                      setInfo({ ...info, souscategorie: e.target.value });
                    }}
                  >
                    {Habillement.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : souscategorie === "Loisirs & Divertissement" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.souscategorie}
                    label="sous catégorie"
                    onChange={(e) => {
                      setInfo({ ...info, souscategorie: e.target.value });
                    }}
                  >
                    {Loisirs.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : souscategorie === "Autres" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.souscategorie}
                    label="sous catégorie"
                    onChange={(e) => {
                      setInfo({ ...info, souscategorie: e.target.value });
                    }}
                  >
                    {Autres.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  ></Select>
                )}
              </FormControl>
              <h1 className="erreur">
                {errors?.find((el) => el.param === "souscategorie")?.msg}
              </h1>
              <h4 style={{ marginTop: "30px" }}>Localisation</h4>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Gouvernorat
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={info.gouvernorat}
                  label="gouvernorat"
                  onChange={(e) => {
                    setInfo({ ...info, gouvernorat: e.target.value });
                  }}
                >
                  {gouvernora.map((el) => (
                    <MenuItem value={el}>{el}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <h1 className="erreur">
                {errors?.find((el) => el.param === "gouvernorat")?.msg}
              </h1>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Délégation
                </InputLabel>
                {info.gouvernorat === "Ariana" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {ariana.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Sousse" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {sousse.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Béja" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {beja.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "La Mannouba" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {manouba.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Gafsa" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {gafsa.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Médenine" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {medennine.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Kef" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {kef.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Nabeul" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {nabeul.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Bizerte" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {bizerte.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Kairouan" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {kairouane.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Kasserine" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {kasserine.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Mahdia" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {mahdia.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Monastir" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {monastir.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Sfax" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {sfax.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Tatouine" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {tatouine.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Zaghouen" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {zagouane.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Ben Arous" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {benarous.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Cabès" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {gabès.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Kébili" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {kébili.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Tozeur" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {tozeur.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Tunis" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {tunis.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Sidi Bouzid" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {sidibouzid.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Jendouba" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {jendouba.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : info.gouvernorat === "Siliana" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  >
                    {siliana.map((el) => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={info.delegation}
                    label="Délégation"
                    onChange={(e) => {
                      setInfo({ ...info, delegation: e.target.value });
                    }}
                  ></Select>
                )}
              </FormControl>
              <h1 className="erreur">
                {errors?.find((el) => el.param === "delegation")?.msg}
              </h1>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                placeholder="Ajouter le prix de votre article..."
                label="Prix"
                type="Prix"
                name="prix"
                fullWidth
                variant="standard"
                onChange={handlechange}
              />
              <h1 className="erreur">
                {errors?.find((el) => el.param === "prix")?.msg}
              </h1>
              <Button onClick={addpostinfo}>Ajouter le poste</Button>
            </DialogContent>
          ) : dialog === "pres2" ? (
            <DialogContent>
              <DialogContentText color={"white"}>
                Compléter le reste des informations
              </DialogContentText>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Livraison</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={info.livraison}
                  onChange={(e) => {
                    setInfo1({ ...info1, livraison: e.target.value });
                  }}
                >
                  <MenuItem value="Oui">Oui</MenuItem>
                  <MenuItem value="Non">Non</MenuItem>
                </Select>
                {/* <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  placeholder="Ajouter le prix de votre article..."
                  label="Prix"
                  type="Prix"
                  name="Prix"
                  fullWidth
                  variant="standard"
                  onChange={handlechange1}
                /> */}
                <Typography variant="h5" component="div">
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => setfile(e.target.files[0])}
                  />
                </Typography>
              </FormControl>
              <Button onClick={AddImage}>Ajouter le reste</Button>
            </DialogContent>
          ) : dialog === "pres3" ? (
            <DialogContent>
              <DialogContentText>Félicitations</DialogContentText>
              <h3>votre annonce a été ajouté avec succès</h3>
              <Link to="/home">
                <Button>Suivant</Button>
              </Link>
            </DialogContent>
          ) : null}
        </form>
        <Dialog open={open2} onClose={handleClos2}>
          <DialogContent>
            <DialogContentText>SUCCESS</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/home">
              <Button onClick={handleClos2}>retour à l'acceuil</Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
      <div style={{ width: "15%" }} className="backgroundlateral"></div>
    </div>
  );
};

export default Déposer_Annonce;
