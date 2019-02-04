import {
  Types
} from "src/redux/constants/types.js";

export const getAcademyList = data => {
  console.log("getAcademyList axios work");
  return {
    type: Types.ACADEMYLIST_LOAD,
    payload: {
      request: {
        url: "/academies?q=" + data,
        q: data
      }
    }
  };
};