import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../actions/authActions";
import { Link, Route, Routes } from "react-router-dom";
import Messages_id from "./messages_id";
import PrivateRoute from "../PrivateRoute";
import "../styles.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const Messages = () => {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <video src="/Videos/video-1.mp4" autoPlay loop muted />
      <Grid container style={{ backgroundColor: "transparent" }}>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            className="header-message"
            style={{ color: "white" }}
          >
            CHAT
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        component={Paper}
        className={classes.chatSection}
        styles={{ width: "15%" }}
        style={{ backgroundColor: "transparent", color: "white" }}
      >
        <Grid item xs={3} className={classes.borderRight500}>
          <h4>Proposition</h4>
          {auth.user?.users.map((user) => (
            <List>
              <Link key={user._id} to={`/messages/${user._id}`}>
                <ListItem button key="RemySharp">
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src={user.image?.IMAGE_URL} />
                  </ListItemIcon>
                  <ListItemText primary={user.firstname}></ListItemText>
                </ListItem>
              </Link>
            </List>
          ))}
          <Divider />
          <h4>recherche d'autres</h4>
          <Grid item xs={12} style={{ padding: "10px", color: "white" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              name="name"
              onChange={(e) => {
                setname({ [e.target.name]: e.target.value });
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(searchUser(name));
              }}
            >
              chercher
            </button>
          </Grid>
          {auth.searchusers?.map((user) =>
            auth.user?._id !== user._id &&
            user._id !== auth.user?.users?.map((user) => user._id) ? (
              <div key={user._id}>
                <List>
                  <Link key={user._id} to={`/messages/${user._id}`}>
                    <ListItem button key="RemySharp">
                      <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={user.image} />
                      </ListItemIcon>
                      <ListItemText primary={user.firstname}>
                        {user.firstname}
                      </ListItemText>
                      {/* <ListItemText
                      secondary="online"
                      align="right"
                    ></ListItemText> */}
                    </ListItem>
                  </Link>
                </List>
              </div>
            ) : null
          )}
          <Divider />
          {/* <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>
            <ListItem button key="Alice">
              <ListItemIcon>
                <Avatar
                  alt="Alice"
                  src="https://material-ui.com/static/images/avatar/3.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItem>
            <ListItem button key="CindyBaker">
              <ListItemIcon>
                <Avatar
                  alt="Cindy Baker"
                  src="https://material-ui.com/static/images/avatar/2.jpg"
                />
              </ListItemIcon>
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
            </ListItem>
          </List> */}
        </Grid>
        <Grid item xs={9}>
          {/* <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List> */}
          <Routes>
            <Route
              path=":userId"
              element={<PrivateRoute component={Messages_id} />}
            />
          </Routes>
          {/* <h1 className={classes.messageArea}>No messages</h1>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
                <SendIcon />
              </Fab>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Messages;
