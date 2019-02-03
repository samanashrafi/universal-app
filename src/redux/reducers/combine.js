import { combineReducers } from 'redux';
import userReducer from 'src/redux/reducers/user-reducer.js';
import searchReducer from 'src/redux/reducers/search-reducer.js';


const reducers = combineReducers({
    user: userReducer,
    search:searchReducer
});

export default reducers;
