import Req from 'axios'
import {
    Distric
} from 'src/redux/constants/types';
import {
    apiUrl
} from 'src/client/routes/apiUrl.js';


export function districFetch() {

    return async function (dispatch) {
        dispatch({
            type: Distric.DISTRIC_LOAD,
            isLoaded: false

        });
        let {
            data
        } = await Req.get(apiUrl + "distric")
        dispatch({
            type: Distric.DISTRIC_SUCCESS,
            payload: data,
            isLoaded: true

        });
    }

};