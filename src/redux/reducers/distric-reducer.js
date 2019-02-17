import {
    Distric
} from 'src/redux/constants/types';

const initialState = {
    list: [],
    isLoaded: false

}

export default function districReducer(state = initialState, action) {

    switch (action.type) {
        case Distric.DISTRIC_LOAD:
            return {
                ...state,
                isLoaded: false
            }
        case Distric.DISTRIC_SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoaded: true
            }
        default:
            return state
    }

}