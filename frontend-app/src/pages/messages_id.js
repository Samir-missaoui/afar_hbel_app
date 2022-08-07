import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  loadMessages,
  LoadMessagesEnvoye,
  loadUser,
  loadUserbyid,
  loadUsers,
  VuMessages,
  VuMessages1,
} from "../actions/authActions";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

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
    height: "67vh",
    overflowY: "auto",
  },
});

const Messages_id = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  useEffect(() => {
    dispatch(loadUserbyid(userId));
    dispatch(loadMessages(userId));
    dispatch(VuMessages1(userId));
    dispatch(VuMessages(userId));
  }, [userId]);
  useEffect(() => {
    dispatch(loadMessages(userId));
    dispatch(loadUser());
  }, [auth.msg]);
  useEffect(() => {
    dispatch(LoadMessagesEnvoye());
  }, [auth.vu]);

  return (
    <div>
      {/* <Grid container> */}
      {/* <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText primary={auth.userbyid?.firstname}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
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
          {auth.searchusers?.map((user) => (
            <div key={user._id}>
              <List>
                <Link key={user._id} to={`/messages/${user._id}`}>
                  <ListItem button key="RemySharp">
                    <ListItemIcon>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://material-ui.com/static/images/avatar/1.jpg"
                      />
                    </ListItemIcon>
                    <ListItemText primary={user.firstname}>
                      {user.firstname}
                    </ListItemText>
                    <ListItemText
                      secondary="online"
                      align="right"
                    ></ListItemText>
                  </ListItem>
                </Link>
              </List>
            </div>
          ))}
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
          </List> 
        </Grid> */}
      <Grid item xs={9} style={{ width: "auto" }}>
        <List className={classes.messageArea}>
          {auth.messages?.map((message) => (
            <ListItem key={message._id}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align={userId === message.sender ? "right" : "left"}
                    primary={message.message}
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    align={userId === message.sender ? "right" : "left"}
                    secondary={format(
                      new Date(message.created_at),
                      "dd-MM-yyyy HH:mm"
                    )}
                  ></ListItemText>
                  <ListItemText
                    sx={{ color: "darkturquoise" }}
                    align={userId === message.sender ? "right" : "left"}
                    secondary={message.statut}
                  ></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Grid container style={{ padding: "20px" }}>
          <Grid item xs={11} style={{ color: "white" }}>
            <TextField
              id="outlined-basic-email"
              label="Ecrit quelque chose"
              fullWidth
              name="message"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  dispatch(VuMessages(userId));
                  // dispatch(loadusers(userId));
                  dispatch(addMessage({ message, recipient: userId }));
                }
                // if (
                //   (e.key === "Enter" &&
                //     auth.user.users._id.includes(userId) === false) ||
                //   (e.key === "Enter" &&
                //     auth.user.users.includes(userId) === false)
                // ) {
                // }
              }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </Grid>
          <Grid xs={1} align="right">
            <Fab color="primary" aria-label="add">
              <SendIcon
                onClick={(e) => {
                  e.preventDefault();
                  // dispatch(loadusers(userId));
                  dispatch(addMessage({ message, recipient: userId }));
                  // dispatch(loadMessages(userId));
                  /*  if (auth.user.users._id.includes(userId) === false) {
                    // dispatch(AddUsers(userId));
                  } */
                  // dispatch(loadusers(userId));
                }}
              />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
      {/* </Grid> */}
    </div>
  );
};

export default Messages_id;
