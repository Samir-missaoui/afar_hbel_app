import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addSearch,
  deleteNotification,
  loading,
  loadNot,
  loadUser,
  logoutUser,
} from "../actions/authActions";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { BsFileEarmarkArrowDown, BsFilePost, BsSearch } from "react-icons/bs";
import {
  MdOutlineScreenSearchDesktop,
  MdFavorite,
  MdMessage,
} from "react-icons/md";
import { BiRegistered } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { searchPost } from "../actions/postActions";
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
import { Avatar, Badge, IconButton } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import { format } from "date-fns";

const Navbars = () => {
  const [show, setShow] = useState(false);
  const [search, setsearch] = useState({
    title: "",
    categorie: "",
    souscategorie: "",
    livraison: "",
    delegation: "",
    gouvernorat: "",
    prixmin: 0,
    prixmax: 2000000000000000,
    tri: "",
    currentpage: 1,
    pagesize: 10,
  });
  const [info, setinfo] = useState({
    posttitle: "",
    firstname: "",
    lastname: "",
  });
  const [notifi, setnotifi] = useState({
    notId: "",
    postId: "",
    recipient: "",
  });
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [gouvernorat, setgouvernorat] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleclick = () => {
    dispatch(logoutUser());
  };
  const handlechange = (e) => {
    setsearch({ ...search, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (auth.loading === false && auth.token) {
      dispatch(loadNot());
      dispatch(loadUser());
    }
  }, [auth.loading, auth.token]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClos = () => {
    setOpen(false);
  };
  const handleClos1 = () => {
    dispatch(loading());
    dispatch(deleteNotification(notifi));
    setOpen1(false);
  };
  const navigate = useNavigate();

  const goToPosts = () =>
    navigate({
      pathname: "/rechercher",
      search: `?${createSearchParams(search)}`,
    });
  // useEffect(() => {
  //   if (auth.msg?.msg === "la notification est effacé avec succès") {
  //     navigate(`/post/${notifi.postId}`);
  //   }
  // }, [auth.msg]);
  const handleclick1 = () => {
    // dispatch(deleteNotification(notifi));
    dispatch(searchPost(search));

    setOpen(false);
    if (
      auth.user?.searches?.some(
        (searc) =>
          searc.title === search.title &&
          searc.categorie === search.categorie &&
          searc.souscategorie === search.souscategorie &&
          searc.livraison === search.livraison &&
          searc.prixmax === search.prixmax &&
          searc.prixmin === search.prixmin &&
          searc.delegation === search.delegation &&
          searc.gouvernorat === search.gouvernorat
      )
    ) {
    } else if (auth.token) {
      dispatch(addSearch(search));
    }
    goToPosts();
  };
  const handleclick2 = () => {
    dispatch(loading());
    setOpen1(false);
    dispatch(deleteNotification(notifi));
  };
  const navDropdownTitle = (
    <MenuItem>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={auth.user?.messagespasvu} color="error">
          <MessageIcon fontSize="large" style={{ color: "white" }} />
        </Badge>
      </IconButton>
    </MenuItem>
  );
  const navDropdownTitle2 = (
    <MenuItem>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={auth.user?.notificationspasvu} color="error">
          <NotificationsActiveIcon
            fontSize="large"
            style={{ color: "white" }}
          />
        </Badge>
      </IconButton>
      {/* <p>Notifications</p> */}
    </MenuItem>
  );
  return (
    <div style={{ position: "fixed", width: "100%", zIndex: "2", top: 0 }}>
      {auth.user ? (
        <>
          <Navbar
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
            style={{ height: "10vh" }}
          >
            <Container style={{ maxWidth: "100%" }}>
              <Navbar.Brand as="div">
                <Link
                  to="/home"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  آفار هبال
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto" style={{ alignItems: "center" }}>
                  <Nav.Link as="div">
                    <Link
                      to="/deposerannonce"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <BsFileEarmarkArrowDown />
                      Déposer une annonce
                    </Link>
                  </Nav.Link>
                  <Nav.Link variant="outlined" onClick={handleClickOpen}>
                    <BsSearch />
                    Rechercher
                  </Nav.Link>
                  <NavDropdown title="Outils" id="collasible-nav-dropdown">
                    <NavDropdown.Item as="div">
                      <Link
                        to="/mesrecherches"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <MdOutlineScreenSearchDesktop />
                        Mes recherches
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item as="div">
                      <Link
                        to="/favoris"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <MdFavorite />
                        Favoris
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item as="div">
                      <Link
                        to="/messages"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <MdMessage />
                        Messages
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as="div">
                      <Link
                        to="/post/myposts"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <BsFilePost />
                        Mes postes{" "}
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav className="annonce_modal2">
                  <SearchIcon />
                  <TextField
                    name="title"
                    onChange={handlechange}
                    onKeyPress={async (e) => {
                      if (e.key === "Enter") {
                        dispatch(searchPost(search));
                        goToPosts();
                      }
                    }}
                    id="filled-basic"
                    label="recherche rapide..."
                    variant="filled"
                  />
                </Nav>
                <Nav style={{ alignItems: "center" }}>
                  {auth.user && (
                    <Nav.Link eventKey={2} as="div">
                      <Link
                        to={`/profile/${auth.user._id}`}
                        style={{ color: "inherit", textDecoration: "inherit" }}
                        key={auth.user._id}
                      >
                        {" "}
                        <Avatar src={auth.user.image.IMAGE_URL}></Avatar>
                      </Link>
                    </Nav.Link>
                  )}
                  <Nav className="me-auto">
                    <NavDropdown
                      title={navDropdownTitle}
                      id="collasible-nav-dropdown"
                    >
                      {auth.messagesnonvu &&
                        auth.messagesnonvu.map((message) => (
                          <>
                            <Link to={`/messages/${message.sender._id}`}>
                              <NavDropdown.Item
                                as="div"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  minWidth: "270px",
                                }}
                              >
                                <Avatar
                                  sx={{ width: 24, height: 24 }}
                                  src={message.sender?.image.IMAGE_URL}
                                ></Avatar>
                                <h6>{message.message.substr(0, 8)}...</h6>
                                <h6>
                                  {format(
                                    new Date(message.created_at),
                                    "H:mm, dd/MM "
                                  )}
                                </h6>
                              </NavDropdown.Item>
                              <NavDropdown.Divider />
                            </Link>
                          </>
                        ))}
                    </NavDropdown>
                    <NavDropdown
                      title={navDropdownTitle2}
                      id="collasible-nav-dropdown"
                    >
                      {auth.notifications &&
                        auth.notifications.map((notification) => (
                          <>
                            <NavDropdown.Item
                              onClick={(e) => {
                                setinfo({
                                  ...info,
                                  posttitle: notification.post?.title,
                                  firstname: notification.sender?.firstname,
                                  lastname: notification.sender?.lastname,
                                });
                                setnotifi({
                                  ...notifi,
                                  notId: notification?._id,
                                  postId: notification.post?._id,
                                  recipient: auth.user?._id,
                                });
                                setOpen1(true);
                              }}
                              as="div"
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                                minWidth: "270px",
                              }}
                            >
                              <Avatar
                                sx={{ width: 24, height: 24 }}
                                src={notification.sender?.image.IMAGE_URL}
                              ></Avatar>
                              <h6>
                                {notification.notification.substr(0, 8)}...
                              </h6>
                              <h6>
                                {format(
                                  new Date(notification.created_at),
                                  "H:mm, dd/MM "
                                )}
                              </h6>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                          </>
                        ))}
                    </NavDropdown>
                  </Nav>
                  {/* <MenuItem>
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                    >
                      <Badge
                        badgeContent={auth.user?.messagespasvu}
                        color="error"
                      >
                        <MessageIcon
                          fontSize="large"
                          style={{ color: "white" }}
                        />
                      </Badge>
                    </IconButton>
                  </MenuItem> */}

                  <Nav.Link as="div">
                    <Link
                      to="/contactus"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      Contact Us
                    </Link>
                  </Nav.Link>
                  <h1></h1>
                  <Nav.Link eventKey={2} as="div" onClick={handleclick}>
                    <Link
                      to="/home"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      Log out
                    </Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      ) : (
        <>
          <Navbar
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
            style={{ height: "10vh" }}
          >
            <Container style={{ maxWidth: "100%" }}>
              <Navbar.Brand as="div">
                <Link
                  to="/home"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  آفار هبال
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto" style={{ alignItems: "center" }}>
                  <Nav.Link onClick={handleShow}>
                    <BsFileEarmarkArrowDown />
                    Déposer une annonce
                  </Nav.Link>
                  <Nav.Link
                    // as="div"
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    {/* <Link
                      to="/home"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    > */}
                    <BsSearch />
                    Rechercher
                    {/* </Link> */}
                  </Nav.Link>
                  <NavDropdown title="Outils" id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={handleShow}>
                      <MdOutlineScreenSearchDesktop />
                      Mes recherches
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleShow}>
                      <MdFavorite />
                      Favoris
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleShow}>
                      <MdMessage />
                      Messages
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleShow}>
                      <BsFilePost />
                      Mes postes
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item onClick={handleShow}>
                      <MdFeed />
                      Feed
                    </NavDropdown.Item> */}
                  </NavDropdown>
                </Nav>
                <Nav className="annonce_modal2">
                  <SearchIcon />
                  <TextField
                    name="title"
                    onChange={handlechange}
                    onKeyPress={async (e) => {
                      if (e.key === "Enter") {
                        dispatch(searchPost(search));
                        goToPosts();
                      }
                    }}
                    id="filled-basic"
                    label="recherche rapide..."
                    variant="filled"
                  />
                </Nav>
                <Nav>
                  <Nav.Link eventKey={2} as="div">
                    <Link
                      to="/login"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <FiLogIn />
                      Se connecter
                    </Link>
                  </Nav.Link>
                  <Nav.Link eventKey={2} as="div">
                    <Link
                      to="/register"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      <BiRegistered />
                      Créer un compte
                    </Link>
                  </Nav.Link>
                  <Nav.Link as="div">
                    <Link
                      to="/contactus"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      Contact Us
                    </Link>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          Pour accéder à vos informations privées, vous devez d'abord vous
          inscrire
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            retour
          </Button>
          <Button variant="dark" onClick={handleClose}>
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Login
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Button variant="outlined" onClick={handleShow}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} className="annonce_modal">
        <DialogTitle>Rechercher</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour effectuer une recherche rapide, remplissez les cases suivantes
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            placeholder="Que cherchez vous aujourd'hui ?"
            id="name"
            name="title"
            label="La recherche"
            type="text"
            fullWidth
            variant="standard"
            onChange={handlechange}
            value={search.title}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={search.categorie}
              onChange={(e) => {
                setsearch({ ...search, categorie: e.target.value });
              }}
            >
              {categorie.map((el) => (
                <MenuItem value={el}>{el}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              sous catégorie
            </InputLabel>
            {categorie === "Véhicules" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.souscategorie}
                label="sous catégorie"
                onChange={(e) => {
                  setsearch({ ...search, souscategorie: e.target.value });
                }}
              >
                {Vehicules.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : categorie === "Immobiliers" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.souscategorie}
                label="sous catégorie"
                onChange={(e) => {
                  setsearch({ ...search, souscategorie: e.target.value });
                }}
              >
                {Immobiliers.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : categorie === "Informatique & Multimedia" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.souscategorie}
                label="sous catégorie"
                onChange={(e) => {
                  setsearch({ ...search, souscategorie: e.target.value });
                }}
              >
                {Informatique.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : categorie === "Pour la maison et jardin" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.souscategorie}
                label="sous catégorie"
                onChange={(e) => {
                  setsearch({ ...search, souscategorie: e.target.value });
                }}
              >
                {Maison.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : categorie === "Emploi & Services" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.souscategorie}
                label="sous catégorie"
                onChange={(e) => {
                  setsearch({ ...search, souscategorie: e.target.value });
                }}
              >
                {Emploi.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : categorie === "Entreprises" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.souscategorie}
                label="sous catégorie"
                onChange={(e) => {
                  setsearch({ ...search, souscategorie: e.target.value });
                }}
              >
                {Entreprises.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : categorie === "Habillement & Bien Etre" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.souscategorie}
                label="sous catégorie"
                onChange={(e) => {
                  setsearch({ ...search, souscategorie: e.target.value });
                }}
              >
                {Habillement.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : categorie === "Loisirs & Divertissement" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.souscategorie}
                label="sous catégorie"
                onChange={(e) => {
                  setsearch({ ...search, souscategorie: e.target.value });
                }}
              >
                {Loisirs.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : categorie === "Autres" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.souscategorie}
                label="sous catégorie"
                onChange={(e) => {
                  setsearch({ ...search, souscategorie: e.target.value });
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
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              ></Select>
            )}
          </FormControl>
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
              {gouvernora.map((el) => (
                <MenuItem value={el}>{el}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Délégation</InputLabel>
            {gouvernorat === "Ariana" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {ariana.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Sousse" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {sousse.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Béja" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {beja.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "La Mannouba" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {manouba.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Gafsa" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {gafsa.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Médenine" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {medennine.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Kef" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {kef.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Nabeul" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {nabeul.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Bizerte" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {bizerte.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Kairouan" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {kairouane.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Kasserine" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {kasserine.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Mahdia" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {mahdia.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Monastir" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {monastir.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Sfax" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {sfax.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Tatouine" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {tatouine.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Zaghouen" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {zagouane.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Ben Arous" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {benarous.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Cabès" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {gabès.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Kébili" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {kébili.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Tozeur" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {tozeur.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Tunis" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {tunis.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Sidi Bouzid" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {sidibouzid.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Jendouba" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              >
                {jendouba.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            ) : gouvernorat === "Siliana" ? (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
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
                value={search.delegation}
                label="Délégation"
                onChange={(e) => {
                  setsearch({ ...search, delegation: e.target.value });
                }}
              ></Select>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Livraison</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={search.livraison}
              onChange={(e) => {
                setsearch({ ...search, livraison: e.target.value });
              }}
            >
              <MenuItem value="Oui">Oui</MenuItem>
              <MenuItem value="Non">Non</MenuItem>
            </Select>
          </FormControl>
          <div className="flex">
            <TextField
              autoFocus
              margin="dense"
              placeholder="insérer le prix minimum "
              id="prixmin"
              name="prixmin"
              label="Prix minimum"
              type="text"
              fullWidth
              variant="standard"
              onChange={handlechange}
              // value={search.prixmin}
            />
            <TextField
              autoFocus
              margin="dense"
              placeholder="insérer le prix maximum"
              id="prixmax"
              name="prixmax"
              label="Prix maximum"
              type="text"
              fullWidth
              variant="standard"
              onChange={handlechange}
              // value={search.prixmax}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Link to="/rechercher"> */}
          {/* <Link to={{ pathname: "/foo", query: { search: "query" } }}> */}
          <Button onClick={handleclick1}>Rechercher</Button>
          {/* </Link> */}
          <Button onClick={handleClos}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open1} onClose={handleClose} className="annonce_modal">
        <DialogTitle>La notification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {info.firstname} {info.lastname} a adoré votre poste de titre{" "}
            {info.posttitle}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to={`/post/${notifi.postId}`}>
            <Button onClick={handleclick2}>Aller au poste</Button>
          </Link>
          <Button onClick={handleClos1}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Navbars;
