import Req from 'axios'
import {
    ArtMusic
} from 'src/redux/constants/types';
import {
    apiUrl
} from 'src/client/routes/apiUrl.js';


export function artMusicCategory() {

    return async function (dispatch) {
        dispatch({
            type: ArtMusic.ARTMUSICCATEGORY_LOAD,
            isLoaded: false
        });
        let {
            data
        } = await Req.get(apiUrl + "artmusiccategory")
        dispatch({
            type: ArtMusic.ARTMUSICCATEGORY_SUCCESS,
            payload: data,
            isLoaded: true

        });
    }

};