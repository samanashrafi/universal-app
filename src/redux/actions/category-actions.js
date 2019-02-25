import Req from "axios";
import { Category } from "src/redux/constants/types";
import { jsonUrl } from "src/client/routes/apiUrl.js";

export function getCategory() {
  return async function(dispatch) {
    dispatch({
      type: Category.CATEGORY_LOAD,
      isLoaded: false
    });
    let { data } = await Req.get(jsonUrl + "category");
    dispatch({
      type: Category.CATEGORY_SUCCESS,
      payload: data,
      isLoaded: true
    });
  };
}
