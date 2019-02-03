import { combineReducers } from 'redux';
import userReducer from 'src/redux/reducers/user-reducer.js';

const reducers = combineReducers({
    user: userReducer
});

export default reducers;
