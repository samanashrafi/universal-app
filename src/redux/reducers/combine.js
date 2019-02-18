import {
    combineReducers
} from 'redux';
import userReducer from 'src/redux/reducers/user-reducer.js';
import citesReducer from 'src/redux/reducers/cites-reducer.js'
import districtReducer from 'src/redux/reducers/district-reducer.js'
import artMusicReducer from 'src/redux/reducers/artMusic-reducer.js'

import academyListReducer from 'src/redux/reducers/academyList-reducer.js';


const reducers = combineReducers({
    user: userReducer,
    cites: citesReducer,
    district: districtReducer,
    artMusic: artMusicReducer,
    academyList: academyListReducer
});

export default reducers;