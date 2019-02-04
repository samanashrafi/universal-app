import {
    combineReducers
} from 'redux';
import userReducer from 'src/redux/reducers/user-reducer.js';
import searchReducer from 'src/redux/reducers/search-reducer.js';
import academyListReducer from 'src/redux/reducers/academyList-reducer.js';


const reducers = combineReducers({
    user: userReducer,
    search: searchReducer,
    academyList: academyListReducer
});

export default reducers;