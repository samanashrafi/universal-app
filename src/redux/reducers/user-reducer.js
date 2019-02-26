import { Types } from "../constants/user-types";
import { User } from "src/redux/constants/types";
const initialState = {
  name: null,
  email: null,
  isAuthenticated: false,
  user: {},
  register: false,
  errors: {}
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
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errors: {}
      };

    case User.USERREGISTER_LOAD:
      return { ...state, register: false };
    case User.USERREGISTER_SUCCESS:
      return {
        ...state,
        register: true,
        errors: {}
      };
    case User.USERLOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        errors: {}
      };
    case User.USER_ERRORS:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}
