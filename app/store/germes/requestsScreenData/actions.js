export const REQUESTS_SCREEN_DATA_GET = "GET_REQUESTS_SCREEN_DATA"; // положили строку в константу
export const REQUESTS_SCREEN_DATA_GET_SUCCESS =
  "REQUESTS_SCREEN_DATA_GET_SUCCESS";
export const REQUESTS_SCREEN_DATA_GET_FAIL = "REQUESTS_SCREEN_DATA_GET_FAIL";

import { getReceptions,getReceptionsSuccess } from "../receptions/actions";
import { fetchRequests } from "../requests/actions";
import { setReception } from "../filter/actions";
import api from "../../../api/index";

// export function getReqestsScreenData() {
//   return  (dispatch, getState) => {
//     try {
//       dispatch({ type: REQUESTS_SCREEN_DATA_GET });
//       await dispatch({ type: REQUESTS_SCREEN_DATA_GET_SUCCESS  });
//     } catch (error) {
//       dispatch({ type: REQUESTS_SCREEN_DATA_GET_FAIL, error });
//     }
//   };
// }

export function getRequestsScreenData() {
  return (dispatch, getState) => {
    dispatch({ type: REQUESTS_SCREEN_DATA_GET });
    // Remember I told you dispatch() can now handle thunks?
    try {
      api.getReceptions()
        .then(response => {
          dispatch(getReceptionsSuccess(response.data))
          let data = response.data;
          data["123906749000"] ? "123906749000" : data[0];
          dispatch(setReception("123906749000"));
        
          dispatch(fetchRequests());
          dispatch(getRequestsScreenDataSuccess());
        });
    } catch (error) {
      dispatch(getRequestsScreenDataFail(error));
    }

    // return dispatch(getReceptions()).then(() => {
    //   setReception("123906749000");
    //   return dispatch(fetchRequests());
    // });
  };
}

export function getRequestsScreenDataSuccess() {
  return {
    type: REQUESTS_SCREEN_DATA_GET_SUCCESS
  };
}

export function getRequestsScreenDataFail(error) {
  return {
    type: REQUESTS_SCREEN_DATA_GET_FAIL,
    payload: error
  };
}
