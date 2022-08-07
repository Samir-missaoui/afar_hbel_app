import {
  POST_FAIL,
  POST_SUCCESS,
  GETMYPOSTS_SUCCESS,
  GETMYPOSTS_FAIL,
  GETPOSTS_SUCCESS,
  GETPOSTS_FAIL,
  GETPOST_SUCCESS,
  GETPOST_FAIL,
  UPDATEPOST_SUCCESS,
  UPDATEPOST_FAIL,
  DELETEPOST_FAIL,
  DELETEPOST_SUCCESS,
  SEARCHPOST_FAIL,
  SEARCHPOST_SUCCESS,
  COUNTPOSTS_SUCCESS,
  COUNTPOSTS_FAIL,
  ADDPOSTIMAGE_SUCCESS,
  ADDPOSTIMAGE_FAIL,
} from "./types";
import axios from "axios";
import setToken from "../setToken";
export const AddPostImage = (info) => (dispatch) => {
  const userinfo = new FormData();
  userinfo.append("picture", info.file);
  userinfo.append("info", JSON.stringify(info.info1));
  axios
    .post("/post/add/image", userinfo)
    .then((res) =>
      dispatch({
        type: ADDPOSTIMAGE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADDPOSTIMAGE_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const addPostInfo = (info) => (dispatch) => {
  axios
    .post("/post/add", info)
    .then((res) =>
      dispatch({
        type: POST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: POST_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const getPosts = (params) => (dispatch) => {
  axios
    .get("/post/posts", { params })
    .then((res) =>
      dispatch({
        type: GETPOSTS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GETPOSTS_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const searchPost = (params) => (dispatch) => {
  axios
    .get("/search/posts", { params })
    .then((res) =>
      dispatch({
        type: SEARCHPOST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: SEARCHPOST_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const getMyPosts = () => (dispatch) => {
  setToken();
  axios
    .get("/post/myposts")
    .then((res) =>
      dispatch({
        type: GETMYPOSTS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GETMYPOSTS_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const countPosts = () => (dispatch) => {
  axios
    .get("/post/count")
    .then((res) =>
      dispatch({
        type: COUNTPOSTS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: COUNTPOSTS_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const getPost = (id) => (dispatch) => {
  axios
    .get("/post/myposts/" + id)
    .then((res) =>
      dispatch({
        type: GETPOST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GETPOST_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const updatePost = (id, info) => (dispatch) => {
  axios
    .put("/update/post/" + id, info)
    .then((res) =>
      dispatch({
        type: UPDATEPOST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATEPOST_FAIL,
        payload: err.response.data.errors,
      })
    );
};
export const deletePost = (id) => (dispatch) => {
  axios
    .delete("/delete/" + id)
    .then((res) =>
      dispatch({
        type: DELETEPOST_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETEPOST_FAIL,
        payload: err.response.data.errors,
      })
    );
};
