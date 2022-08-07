import {
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../actions/postActions";

const Selectsearch = () => {
  const [info, setInfo] = useState({
    title: "",
    description: "",
    categorie: "",
    delegation: "",
    livraison: "",
  });
  const [dialog, setdialog] = useState("pres1");
  const [gouvernorat, setgouvernorat] = useState("");
  const [errors, setErrors] = useState(null);
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const auth = useSelector((state) => state.post);
  useEffect(() => {
    if (auth.error) {
      setErrors(auth.error);
      setTimeout(() => {
        setErrors(null);
      }, 5000);
    }
  }, [auth.isAuth, auth.error]);
  const handlechange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const postNow = (e) => {
    e.preventDefault();
    dispatch(addPost(info));
  };
  return (
    <div>
      <DialogContent>
        <DialogContentText>Modifier vos coordonnées</DialogContentText>
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
        {errors?.find((el) => el.param === "title")?.msg}
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
        {errors?.find((el) => el.param === "description")?.msg}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={info.categorie}
            onChange={(e) => {
              setInfo({ ...info, categorie: e.target.value });
            }}
          >
            <MenuItem value="Voitures">Voitures</MenuItem>
            <MenuItem value="Motos">Motos</MenuItem>
            <MenuItem value="Pièces et accessoires véhicules">
              Pièces et accessoires véhicules
            </MenuItem>
            <MenuItem value="Bateaux">Bateaux</MenuItem>
            <MenuItem value="Remorques et Caravanes">
              Remorques et Caravanes
            </MenuItem>
            <MenuItem value="Engins Agricole">Engins Agricole</MenuItem>
            <MenuItem value="Engins BTP">Engins BTP</MenuItem>
            <MenuItem value="Camions">Camions</MenuItem>
            <MenuItem value="Autres">Autres</MenuItem>
          </Select>
        </FormControl>
        <h4>Localisation</h4>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gouvernorat</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gouvernorat}
            label="Délégation"
            onChange={(e) => {
              setgouvernorat(e.target.value);
            }}
          >
            <MenuItem value="Ariana">Ariana</MenuItem>
            <MenuItem value="Béja">Béja</MenuItem>
            <MenuItem value="Ben Arous">Ben Arous</MenuItem>
            <MenuItem value="Bizerte">Bizerte</MenuItem>
            <MenuItem value="Cabès">Cabès</MenuItem>
            <MenuItem value="Gafsa">Gafsa</MenuItem>
            <MenuItem value="Jendouba">Jendouba</MenuItem>
            <MenuItem value="Kairouan">Kairouan</MenuItem>
            <MenuItem value="Kasserine">Kasserine</MenuItem>
            <MenuItem value="Kébili">Kébili</MenuItem>
            <MenuItem value="La Mannouba">La Mannouba</MenuItem>
            <MenuItem value="Kef">Kef</MenuItem>
            <MenuItem value="Mahdia">Mahdia</MenuItem>
            <MenuItem value="Médenine">Médenine</MenuItem>
            <MenuItem value="Monastir">Monastir</MenuItem>
            <MenuItem value="Nabeul">Nabeul</MenuItem>
            <MenuItem value="Sfax">Sfax</MenuItem>
            <MenuItem value="Sidi Bouzid">Sidi Bouzid</MenuItem>
            <MenuItem value="Siliana">Siliana</MenuItem>
            <MenuItem value="Sousse">Sousse</MenuItem>
            <MenuItem value="Tatouine">Tatouine</MenuItem>
            <MenuItem value="Tozeur">Tozeur</MenuItem>
            <MenuItem value="Tunis">Tunis</MenuItem>
            <MenuItem value="Zaghouen">Zaghouen</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Délégation</InputLabel>
          {gouvernorat === "Ariana" ? (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={info.delegation}
              label="Délégation"
              onChange={(e) => {
                setInfo({ ...info, delegation: e.target.value });
              }}
            >
              <MenuItem value="Ariana Ville">Ariana Ville</MenuItem>
              <MenuItem value="Autres Villes">Autres Villes</MenuItem>
              <MenuItem value="Borj Louzir">Borj Louzir</MenuItem>
              <MenuItem value="Chotrana">Chotrana</MenuItem>
              <MenuItem value="Ennasr">Ennasr</MenuItem>
              <MenuItem value="Ettadhamen">Ettadhamen</MenuItem>
              <MenuItem value="Ghazala">Ghazala</MenuItem>
              <MenuItem value="Jardins Elmanzah">Jardins Elmanzah</MenuItem>
              <MenuItem value="La Soukra">La Soukra</MenuItem>
              <MenuItem value="Mnihla">Mnihla</MenuItem>
              <MenuItem value="Raoued">Raoued</MenuItem>
              <MenuItem value="Sidi Thabet">Sidi Thabet</MenuItem>
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
        <Button>Suivant</Button>
      </DialogContent>
    </div>
  );
};

export default Selectsearch;
