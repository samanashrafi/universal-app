import Req from 'axios'
import {
    District
} from 'src/redux/constants/types';
import {
    apiUrl
} from 'src/client/routes/apiUrl.js';


export function districtFetch() {

    return async function (dispatch) {
        dispatch({
            type: District.DISTRICT_LOAD,
            isLoaded: false

        });
        let {
            data
        } = await Req.get(apiUrl + "district")
        dispatch({
            type: District.DISTRICT_SUCCESS,
            payload: data,
            isLoaded: true

        });
    }

};