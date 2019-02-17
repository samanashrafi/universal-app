import {
    Cites
} from "src/redux/constants/types"

const initialState = {
    list: [],
    isLoaded: false
}

export default function citesReducer(state = initialState, action) {

    switch (action.type) {

        case Cites.CITES_LOAD:
            return {
                ...state,
                isLoaded: false,
            }
        case Cites.CITES_SUCCESS:
            return {
                ...state,
                list: action.payload,
                isLoaded: true

            }

        default:
            return state;
    }

}