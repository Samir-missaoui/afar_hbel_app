import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  GETUSERBYID_FAIL,
  GETUSERBYID_SUCCESS,
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAIL,
  UPDATEPASSWORD_SUCCESS,
  UPDATEPASSWORD_FAIL,
  ADDFAVPOST_SUCCESS,
  ADDFAVPOST_FAIL,
  DELETEFAVPOST_SUCCESS,
  DELETEFAVPOST_FAIL,
  ADDSEARCH_SUCCESS,
  ADDSEARCH_FAIL,
  LOADING_SUCCESS,
  LOADMESSAGES_SUCCESS,
  LOADMESSAGES_FAIL,
  LOADUSERS_SUCCESS,
  LOADUSERS_FAIL,
  SEARCHDUSERS_SUCCESS,
  SEARCHDUSERS_FAIL,
  ADDMESSAGE_SUCCESS,
  ADDMESSAGE_FAIL,
  DELETEUSER_SUCCESS,
  DELETEUSER_FAIL,
  ADDIMAGE_SUCCESS,
  ADDIMAGE_FAIL,
  ADDUSERS_SUCCESS,
  ADDUSERS_FAIL,
  VUMESSAGE_SUCCESS,
  VUMESSAGE_FAIL,
  VUMESSAGE1_SUCCESS,
  VUMESSAGE1_FAIL,
  LOADMESSAGESENVOYE_SUCCESS,
  LOADMESSAGESENVOYE_FAIL,
  ADDNOTPOST_SUCCESS,
  ADDNOTPOST_FAIL,
  DELETENOTPOST_SUCCESS,
  DELETENOTPOST_FAIL,
  LOADNOTPOST_SUCCESS,
  LOADNOTPOST_FAIL,
} from "./types";
import axios from "axios";
import setToken from "../setToken";
export const registerUser = (info) => (dispatch) => {
  axios
    .post("/register", info)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const addImageUser = (file) => (dispatch) => {
  const userinfo = new FormData();
  userinfo.append("picture", file);
  axios
    .post("/register/image", userinfo)
    .then((res) =>
      dispatch({
        type: ADDIMAGE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADDIMAGE_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const addMessage = (info) => (dispatch) => {
  axios
    .post("/message", info)
    .then((res) =>
      dispatch({
        type: ADDMESSAGE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADDMESSAGE_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const addNotification = (info) => (dispatch) => {
  axios
    .post("/notification", info)
    .then((res) =>
      dispatch({
        type: ADDNOTPOST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADDNOTPOST_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const deleteNotification = (params) => (dispatch) => {
  setToken();
  axios
    .delete("/notification/delete/", { params })
    .then((res) =>
      dispatch({
        type: DELETENOTPOST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETENOTPOST_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const deleteUser = (info) => (dispatch) => {
  setToken();
  axios
    .delete("/delete/", {
      data: {
        password: info.password,
      },
    })
    .then((res) =>
      dispatch({
        type: DELETEUSER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETEUSER_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const updateUser = (id, info) => (dispatch) => {
  axios
    .put("/update/" + id, info)
    .then((res) =>
      dispatch({
        type: UPDATEUSER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATEUSER_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const addfavPost = (postId) => (dispatch) => {
  axios
    .put("/favori", postId)
    .then((res) =>
      dispatch({
        type: ADDFAVPOST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADDFAVPOST_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const addSearch = (info) => (dispatch) => {
  axios
    .put("/search/add", info)
    .then((res) =>
      dispatch({
        type: ADDSEARCH_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADDSEARCH_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const deletefavPost = (postId) => (dispatch) => {
  axios
    .put("/favori/delete", postId)
    .then((res) =>
      dispatch({
        type: DELETEFAVPOST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETEFAVPOST_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const updatePassword = (id, info) => (dispatch) => {
  axios
    .put("/update/password/" + id, info)
    .then((res) =>
      dispatch({
        type: UPDATEPASSWORD_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATEPASSWORD_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const loadUser = () => (dispatch) => {
  setToken();
  axios
    .get("/login")
    .then((res) =>
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_USER_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const loadNot = () => (dispatch) => {
  setToken();
  axios
    .get("/notification/load")
    .then((res) =>
      dispatch({
        type: LOADNOTPOST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOADNOTPOST_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const searchUser = (params) => (dispatch) => {
  setToken();
  axios
    .get("/search/user", { params })
    .then((res) =>
      dispatch({
        type: SEARCHDUSERS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SEARCHDUSERS_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const loadMessages = (userId) => (dispatch) => {
  setToken();
  axios
    .get("/message/load/" + userId)
    .then((res) =>
      dispatch({
        type: LOADMESSAGES_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOADMESSAGES_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const VuMessages = (userId) => (dispatch) => {
  setToken();
  axios
    .put("/message/vu/" + userId)
    .then((res) =>
      dispatch({
        type: VUMESSAGE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: VUMESSAGE_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const LoadMessagesEnvoye = () => (dispatch) => {
  setToken();
  axios
    .get("/message/envoye/load")
    .then((res) =>
      dispatch({
        type: LOADMESSAGESENVOYE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOADMESSAGESENVOYE_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const VuMessages1 = (userId) => (dispatch) => {
  setToken();
  axios
    .put("/message/vu1/" + userId)
    .then((res) =>
      dispatch({
        type: VUMESSAGE1_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: VUMESSAGE1_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const AddUsers = (userId) => (dispatch) => {
  setToken();
  axios
    .put("/message/add/users/" + userId)
    .then((res) =>
      dispatch({
        type: ADDUSERS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADDUSERS_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const loadUsers = (userId) => (dispatch) => {
  setToken();
  axios
    .put("/login/users/" + userId)
    .then((res) =>
      dispatch({
        type: LOADUSERS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOADUSERS_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const loadUserbyid = (id) => (dispatch) => {
  axios
    .get("/login/" + id)
    .then((res) =>
      dispatch({
        type: GETUSERBYID_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GETUSERBYID_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const loginUser = (data) => (dispatch) => {
  axios
    .post("/login", data)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
export const loading = () => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS,
  });
};
