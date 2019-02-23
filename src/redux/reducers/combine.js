import { combineReducers } from "redux";
import userReducer from "src/redux/reducers/user-reducer.js";
import citesReducer from "src/redux/reducers/cites-reducer.js";
import categoryReducer from "src/redux/reducers/category-reducer.js";

const reducers = combineReducers({
  auth: userReducer,
  cites: citesReducer,
  category: categoryReducer
});

export default reducers;
