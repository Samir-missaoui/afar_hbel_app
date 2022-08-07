import React, { useEffect } from "react";
import "../styles.css";
import { loadMessages, loadUser } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../components/HeroSection";
const Feed = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);
  return (
    <div className="display" style={{ height: "90vh" }}>
      <div style={{ width: "15%" }} className="backgroundlateral"></div>
      <div
        style={{
          width: "70%",
        }}
        className="background"
      >
        <HeroSection video="/Videos/video-1.mp4" />
        <h1>PAGE FEED</h1>
        {auth.user && <p> Hello {auth.user.firstname}</p>}
      </div>
      <div style={{ width: "15%" }} className="backgroundlateral"></div>
    </div>
  );
};

export default Feed;
