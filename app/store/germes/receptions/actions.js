import api from "../../../api";
import { keyBy } from "lodash";
// https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
// action name: <NOUN>_<VERB>
// action creator name: <verb><Noun>
// selector name: get<Noun>
export const RECEPTION_GET = "RECEPTION_GET";
export const RECEPTION_GET_SUCCESS = "RECEPTION_GET_SUCCESS";
export const RECEPTION_GET_FAIL = "RECEPTION_GET_FAIL";

// export const RECEPTION_ADD_NEW = "RECEPTION_ADD_NEW";
// export const RECEPTION_REMOVE = "RECEPTION_REMOVE";

export function getReceptions() {
  return  (dispatch, getState) => {
    try {
      dispatch({ type: RECEPTION_GET });
      api
        .getReceptions()
        .then(response => dispatch(getReceptionsSuccess(response.data)));
    } catch (error) {
      dispatch({ type: RECEPTION_GET_FAIL, error });
    }
  };
}

export function getReceptionsSuccess(items) {
  return {
    type: RECEPTION_GET_SUCCESS,
    payload: keyBy(items, "id")
  };
}

export function getReceptionsFail(error) {
  return {
    type: RECEPTION_GET_FAIL,
    payload: error
  };
}
