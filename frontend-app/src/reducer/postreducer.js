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
  DELETEPOST_SUCCESS,
  DELETEPOST_FAIL,
  SEARCHPOST_SUCCESS,
  SEARCHPOST_FAIL,
  COUNTPOSTS_SUCCESS,
  COUNTPOSTS_FAIL,
  ADDPOSTIMAGE_SUCCESS,
  ADDPOSTIMAGE_FAIL,
} from "../actions/types";
let initstate = {
  postList: null,
  error: null,
  postdesc: null,
  msg: null,
  searchpost: null,
  countposts: null,
};
const postreducer = (state = initstate, action) => {
  switch (action.type) {
    case POST_SUCCESS:
      return {
        ...state,
        searchpost: action.payload,
        msg: "success",
        error: null,
      };
    case ADDPOSTIMAGE_SUCCESS:
      return {
        ...state,
        postList: [...state.postList, action.payload],
        msg: "successss",
        error: null,
      };
    case SEARCHPOST_SUCCESS:
      return {
        ...state,
        searchpost: action.payload,
        countposts: action.payload.count_rech_tit_souscat_dele_prix_res,
        error: null,
      };
    case COUNTPOSTS_SUCCESS:
      return {
        ...state,
        countposts: action.payload,
        error: null,
      };
    case UPDATEPOST_SUCCESS:
      return {
        postdesc: action.payload,
        error: null,
      };
    case DELETEPOST_SUCCESS:
      return {
        msg: action.payload,
        error: null,
      };
    case GETPOST_SUCCESS:
      return {
        ...state,
        postdesc: action.payload,
        error: null,
      };
    case GETMYPOSTS_SUCCESS:
      return {
        postList: action.payload,
        error: null,
      };
    case GETPOSTS_SUCCESS:
      return {
        ...state,
        postList: action.payload,
        error: null,
        postdesc: null,
        msg: null,
      };
    case COUNTPOSTS_FAIL:
    case SEARCHPOST_FAIL:
    case DELETEPOST_FAIL:
    case UPDATEPOST_FAIL:
    case GETPOST_FAIL:
    case POST_FAIL:
    case GETMYPOSTS_FAIL:
    case GETPOSTS_FAIL:
    case ADDPOSTIMAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default postreducer;
