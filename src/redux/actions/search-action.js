import {
    Types
} from "src/redux/constants/types.js";
import {
    apiUrl
} from 'src/client/routes/apiUrl.js'
import axios from "axios"

export const searchFetch = data => dispatch => {
    console.log(apiUrl)
    axios
        .get(apiUrl + "academies?q=" + data)
        .then((res) => {
            console.log(res);
            dispatch({
                type: Types.SEARCH_FILTER_HOME,
                payload: res.data,
                isLoaded: true

            });
        })
        .catch(err => {
            dispatch({
                type: Types.SEARCH_FILTER_HOME,
                payload: err.response
            });
        });
};