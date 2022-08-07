import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./PrivateRoute";
import Profile from "./pages/Profile";
import Déposer_Annonce from "./pages/Déposer-Annonce";
import Favoris from "./pages/Favoris";
import Mes_Recherches from "./pages/Mes_Recherches";
import Messages from "./pages/Messages";
import Postdesc from "./pages/Postdesc";
import Contact_Us from "./pages/Contact-Us";
import { useEffect } from "react";
import { LoadMessagesEnvoye, loadNot, loadUser } from "./actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import MyPosts from "./pages/MyPosts";
import Rechercher from "./pages/Rechercher";
import Acc from "./pages/Acc";
<link
  rel="stylesheet"
  href="path/to/font-awesome/css/font-awesome.min.css"
></link>;
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.token) {
      dispatch(loadUser());
      dispatch(LoadMessagesEnvoye());
      dispatch(loadNot());
    }
  }, [auth.token]);

  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "10vh" }}></div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Acc />} />
        <Route path="/rechercher" element={<Rechercher />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route
          path="/deposerannonce"
          element={<PrivateRoute component={Déposer_Annonce} />}
        />
        <Route path="/favoris" element={<PrivateRoute component={Favoris} />} />
        <Route
          path="/mesrecherches"
          element={<PrivateRoute component={Mes_Recherches} />}
        />
        <Route
          path="/messages/*"
          element={<PrivateRoute component={Messages} />}
        />
        <Route
          path="/post/myposts"
          element={<PrivateRoute component={MyPosts} />}
        />
        <Route path="/post/:postid" element={<Postdesc />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<Contact_Us />} />
        {/* <Route path="/feed" element={<PrivateRoute component={Feed} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
