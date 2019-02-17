import Req from 'axios'
import {
    Cites
} from 'src/redux/constants/types';
import {
    apiUrl
} from 'src/client/routes/apiUrl.js';


export function citesFetch() {

    return async function (dispatch) {
        let {
            data
        } = await Req.get(apiUrl + "cites")
        dispatch({
            type: Cites.CITES_SUCCESS,
            payload: data,
            isLoaded: true

        });
    }

};