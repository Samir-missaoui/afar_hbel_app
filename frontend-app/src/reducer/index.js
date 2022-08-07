import { combineReducers } from "redux";
import Authreducer from "./authreducer";
import postreducer from "./postreducer";

export default combineReducers({ auth: Authreducer, post: postreducer });
