import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    // Applay To every requset
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
