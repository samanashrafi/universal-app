import {
    ArtMusic
} from 'src/redux/constants/types.js';

const initialState = {
    list: [],
    isloaded: false,
}

export default function artMusicReducer(state = initialState, action) {
    switch (action.type) {

        case ArtMusic.ARTMUSICCATEGORY_LOAD:
            return {
                ...state,
                isloaded: false
            }
        case ArtMusic.ARTMUSICCATEGORY_SUCCESS:
            return {
                ...state,
                list: action.payload,
                isloaded: false
            }
        default:
            return state;


    }

}