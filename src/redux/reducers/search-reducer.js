// import {
//     Types
// } from "src/redux/types.js";
const SEARCH_FILTER_HOME_LOAD = 'SEARCH_FILTER_HOME_LOAD';
const SEARCH_FILTER_HOME_LOAD_SUCCESS = 'SEARCH_FILTER_HOME_LOAD_SUCCESS';
const SEARCH_FILTER_HOME_LOAD_FAIL = 'SEARCH_FILTER_HOME_LOAD_FAIL';

const initialState = {
    data: [],
    isLoaded: false,
    hasErrored: false,
    errorMessage: ""
}

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        // case Types.SEARCH_FILTER_HOME:
        //     return { ...state,
        //         data: action.payload.data,
        //         isLoaded: true
        //     }

        case SEARCH_FILTER_HOME_LOAD:
            {
                return Object.assign({}, state, {
                    isLoaded: false,
                    hasErrored: false
                });
            }

        case SEARCH_FILTER_HOME_LOAD_SUCCESS:
            {
                return Object.assign({}, state, {
                    data: action.payload.data,
                    isLoaded: true,
                    hasErrored: false
                });
            }

        case SEARCH_FILTER_HOME_LOAD_FAIL:
            {
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