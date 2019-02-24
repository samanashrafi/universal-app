import { Types } from "src/redux/constants/user-types";
import { User } from "src/redux/constants/types";
import { apiUrl } from "src/client/routes/apiUrl.js";
import { setAuthToken } from "client/app/common/setAuthToken";

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

export function registerUser() {}

export function loginUser(userData) {
  console.log("login user is done");

  return async function(dispatch) {
    dispatch({
      type: User.USERLOGIN_LOAD,
      isAuthenticated: false
    });
    await getUser(userData, dispatch);
  };
}

function getUser(userData, dispatch) {
  // addClassById("btn-login", "clicked");
  console.log("getUser");

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
      // removeClassById("btn-login", "clicked");
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
