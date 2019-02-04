const ACADEMYLIST_LOAD = "ACADEMYLIST_LOAD";
const ACADEMYLIST_LOAD_SUCCESS = "ACADEMYLIST_LOAD_SUCCESS";
const ACADEMYLIST_LOAD_FAIL = "ACADEMYLIST_LOAD_FAIL";

const initialState = {
  data: [],
  isLoaded: false,
  hasErrored: false,
  errorMessage: ""
};

export default function academyListReducer(state = initialState, action) {
  switch (action.type) {
    case ACADEMYLIST_LOAD: {
      return Object.assign({}, state, {
        isLoaded: false,
        hasErrored: false
      });
    }

    case ACADEMYLIST_LOAD_SUCCESS: {
      return Object.assign({}, state, {
        data: action.payload.data,
        isLoaded: true,
        hasErrored: false
      });
    }

    case ACADEMYLIST_LOAD_FAIL: {
      return Object.assign({}, state, {
        isLoaded: false,
        hasErrored: true,
        errorMessage: action.error.message
      });
    }
    default:
      return state;
  }
}
