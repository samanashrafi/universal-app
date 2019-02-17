import {
    District
} from 'src/redux/constants/types';

const initialState = {
    list: [],
    isLoaded: false

}

export default function districtReducer(state = initialState, action) {

    switch (action.type) {
        case District.DISTRICT_LOAD:
            return {
                ...state,
                isLoaded: false
            }
        case District.DISTRICT_SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoaded: true
            }
        default:
            return state
    }

}