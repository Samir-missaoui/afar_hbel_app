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
  VUMESSAGE1_SUCCESS,
  VUMESSAGE1_FAIL,
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
  LOADMESSAGESENVOYE_SUCCESS,
  LOADMESSAGESENVOYE_FAIL,
  ADDNOTPOST_SUCCESS,
  ADDNOTPOST_FAIL,
  DELETENOTPOST_SUCCESS,
  DELETENOTPOST_FAIL,
  LOADNOTPOST_SUCCESS,
  LOADNOTPOST_FAIL,
} from "../actions/types";
let initstate = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false,
  error: null,
  userbyid: null,
  loading: false,
  messages: null,
  messagesnonvu: null,
  users: null,
  searchusers: null,
  notifications: null,
  msg: null,
  vu: null,
};
const Authreducer = (state = initstate, action) => {
  switch (action.type) {
    case GETUSERBYID_SUCCESS:
      return {
        ...state,
        userbyid: action.payload,
        error: null,
      };

    case ADDIMAGE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        msg: "image success",
      };
    case ADDUSERS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        msg: null,
      };
    case LOADNOTPOST_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        error: null,
      };
    case LOADMESSAGESENVOYE_SUCCESS:
      return {
        ...state,
        messagesnonvu: action.payload,
        error: null,
      };
    case LOADMESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        error: null,
      };
    case VUMESSAGE_SUCCESS:
      return {
        ...state,
        vu: action.payload,
        error: null,
      };
    case VUMESSAGE1_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOADUSERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case SEARCHDUSERS_SUCCESS:
      return {
        ...state,
        searchusers: action.payload,
        error: null,
      };
    case DELETEUSER_SUCCESS:
      localStorage.removeItem("token");
      return {
        user: null,
        isAuth: false,
        userbyid: null,
        loading: false,
        messages: null,
        users: null,
        searchusers: null,
        error: null,
        msg: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        error: null,
      };
    case DELETEFAVPOST_SUCCESS:
      return {
        ...state,
        user: action.payload.second_query_res,
        error: null,
        msg: "deletesuccess",
      };
    case ADDFAVPOST_SUCCESS:
      return {
        ...state,
        user: action.payload.second_query_res,
        error: null,
        msg: "addsuccess",
      };
    case ADDSEARCH_SUCCESS:
    case UPDATEUSER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        msg: "update success",
      };
    case ADDMESSAGE_SUCCESS:
      return {
        ...state,
        msg: action.payload.third_query_res,
        error: null,
      };
    case ADDNOTPOST_SUCCESS:
      return {
        ...state,
        msg: action.payload.first_query_res,
        error: null,
        loading: false,
      };
    case DELETENOTPOST_SUCCESS:
      return {
        ...state,
        msg: action.payload,
        error: null,
        loading: false,
      };
    case UPDATEPASSWORD_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        msg: "update success",
      };
    case VUMESSAGE_FAIL:
    case LOADMESSAGESENVOYE_FAIL:
    case VUMESSAGE1_FAIL:
    case ADDUSERS_FAIL:
    case ADDIMAGE_FAIL:
    case LOADMESSAGES_FAIL:
    case ADDMESSAGE_FAIL:
    case SEARCHDUSERS_FAIL:
    case LOADNOTPOST_FAIL:
    case LOADUSERS_FAIL:
    case ADDSEARCH_FAIL:
    case DELETEFAVPOST_FAIL:
    case ADDFAVPOST_FAIL:
    case UPDATEPASSWORD_FAIL:
    case ADDNOTPOST_FAIL:
    case DELETENOTPOST_FAIL:
    case UPDATEUSER_FAIL:
    case LOAD_USER_FAIL:
    case GETUSERBYID_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        user: null,
        error: null,
        msg: null,
      };
    case DELETEUSER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOADING_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default Authreducer;
