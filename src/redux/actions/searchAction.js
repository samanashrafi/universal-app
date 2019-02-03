import {
    Types
} from "src/redux/constants/types.js";
import axios from "axios"

export const searchFetch = data => dispatch => {
    // axios
    //     .get("http://localhost:4000/api/")
    //     .then((res) => {
    //         console.log(res);
    //         dispatch({
    //             type: Types.SEARCH_FILTER_HOME,
    //             payload: res.data,
    //         });
    //     })
    //     .catch(err => {
    //         dispatch({
    //             type: Types.SEARCH_FILTER_HOME,
    //             payload: err.response
    //         });
    //     });
};