import { Types } from "../constants/user-types";
import { User } from "src/redux/constants/types";
const initialState = {
  name: null,
  email: null,
  isAuthenticated: false,
  user: {},
  errors: []
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case Types.UPDATE_NAME:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email
      };
    case User.USERLOGIN_LOAD:
      return { ...state, isAuthenticated: false };
    case User.USERLOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload };
    case User.USERLOGIN_ERRORS:
      return { ...state, errors: action.payload.errors };
    default:
      return state;
  }
}
