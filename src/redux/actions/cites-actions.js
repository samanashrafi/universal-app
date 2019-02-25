import Req from "axios";
import { Cites } from "src/redux/constants/types";
import { jsonUrl } from "src/client/routes/apiUrl.js";

export function getCites() {
  return async function(dispatch) {
    dispatch({
      type: Cites.CITES_LOAD,
      isLoaded: false
    });
    let { data } = await Req.get(jsonUrl + "cites");
    dispatch({
      type: Cites.CITES_SUCCESS,
      payload: data,
      isLoaded: true
    });
  };
}
