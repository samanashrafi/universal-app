import { Category } from "src/redux/constants/types.js";

const initialState = {
  list: [],
  isLoaded: false
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case Category.CATEGORY_LOAD:
      return {
        ...state,
        isLoaded: false
      };
    case Category.CATEGORY_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoaded: true
      };
    default:
      return state;
  }
}
