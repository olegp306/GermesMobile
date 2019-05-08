import api from "../../../middleware/api";
import { keyBy } from "lodash";
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
export const FILE_POST = "FILE_POST";
export const FILE_POST_SUCCESS = "FILE_POST_SUCCESS";
export const FILE_POST_FAIL = "FILE_POST_FAIL";

// export const FILE_ADD_NEW = "FILE_ADD_NEW";
// export const FILE_REMOVE = "FILE_REMOVE";

export function postFile(file) {
  return  (dispatch, getState) => {
    try {
      dispatch({ type: FILE_POST });
      api
        .postFile(file)
        .then(response => dispatch(postFileSuccess(response.data)));
    } catch (error) {
      dispatch(postFileFail);
    }
  };
}

export function postFileSuccess(item) {
  return {
    type: FILE_POST_SUCCESS,
    payload: item
  };
}

export function postFileFail(error) {
  return {
    type: FILE_POST_FAIL,
    payload: error
  };
}
