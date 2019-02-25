import { Types } from "src/redux/constants/user-types";
import { User } from "src/redux/constants/types";
import { apiUrl } from "src/client/routes/apiUrl.js";
import { setAuthToken } from "client/app/common/setAuthToken";
import { addClassById, removeClassById } from "client/app/common/helpers";

import jwt_decode from "jwt-decode";

import Req from "axios";

export function getName(id) {
  return async function(dispatch, getState) {
    let { data } = await getUserFromAPI(id);
    dispatch({ type: Types.UPDATE_NAME, payload: data });
  };
}
function getUserFromAPI(id) {
  return Req.get(`https://jsonplaceholder.typicode.com/users/${id}`);
}

export function registerUser(userData, history) {
  return async function(dispatch) {
    dispatch({
      type: User.USERREGISTER_LOAD
    });
    await setUser(userData, history, dispatch);
  };
}

function setUser(userData, history, dispatch) {
  addClassById("btn-register", "clicked");

  Req.post(apiUrl + "users/register", userData)
    .then(() => {
      history.push("/login");
      dispatch({
        type: User.USERREGISTER_SUCCESS
      });
    })
    .catch(err => {
      removeClassById("btn-register", "clicked");
      dispatch({
        type: User.USER_ERRORS,
        payload: err.response.data
      });
    });
}

export function loginUser(userData) {
  return async function(dispatch) {
    dispatch({
      type: User.USERLOGIN_LOAD,
      isAuthenticated: false
    });
    await getUser(userData, dispatch);
  };
}

function getUser(userData, dispatch) {
  addClassById("btn-login", "clicked");

  return Req.post(apiUrl + "users/login", userData)
    .then(res => {
      // save to localStroge
      const { token } = res.data;
      //set token to Is
      localStorage.setItem("jwtToken", token);
      // Set Token to Auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      removeClassById("btn-login", "clicked");
      dispatch({
        type: User.USER_ERRORS,
        payload: err.response.data
      });
    });
}

export const setCurrentUser = decoded => {
  return {
    type: User.USERLOGIN_SUCCESS,
    payload: decoded
  };
};

export const setUserLogout = decoded => {
  return {
    type: User.USERLOGOUT,
    payload: decoded
  };
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setUserLogout({}));
};
