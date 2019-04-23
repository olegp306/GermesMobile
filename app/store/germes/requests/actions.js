export const IS_REQUESTS_FETCHING = "IS_REQUESTS_FETCHING";
export const FETCH_REQUESTS_SUCCESS = "FETCH_REQUESTS_SUCCESS";
export const FETCH_REQUESTS_ERROR = "FETCH_REQUESTS_ERROR";

export const FETCH_CUSTOMER_REQUESTS = "FETCH_CUSTOMER_REQUESTS";

// перенес в selected items
// export const REQUESTS_STATUS_CHANGE = 'REQUESTS_STATUS_CHANGE'
// export const REQUESTS_STATUS_CHANGE_SUCCESS = 'REQUESTS_STATUS_CHANGE_SUCCESS'
// export const REQUESTS_STATUS_CHANGE_ERROR = 'REQUESTS_STATUS_CHANGE_ERROR'

import { keyBy } from "lodash";
import api from "../../../middleware/api";


const ZAYAVITEL_ROLE = "1317696000"; 

export const fetchRequests = () => {
  return (dispatch, getState) => {
    //getState можно получить данные из STORE
    dispatch({
      type: IS_REQUESTS_FETCHING
    });   
    const { session } = getState();
    const sessionToJS=session.toJS();

    const isZayavitelRole =
    sessionToJS.roles.includes(ZAYAVITEL_ROLE) == 1 ? true : false;

    if (isZayavitelRole) {
      api
        .fetchCustomerRequests()
        .then(data => dispatch(requestsFetched(data.data)))
        .catch(error => requestsFetchingError(error));
    } else {
      const { filter } = getState();
      api
        .fetchRequests(
          filter.get("filterDate"),
          filter.get("filterReceptionId")
        )
        .then(data => dispatch(requestsFetched(data.data)))
        .catch(error => requestsFetchingError(error));
    }
  };
};

export const startFetchRequests = () => {
  return {
    type: FETCH_REQUESTS_START
  };
};

export const requestsFetched = items => {
  return {
    type: FETCH_REQUESTS_SUCCESS,
    payload: keyBy(items, "requestId")
  };
};

export const requestsFetchingError = error => {
  return {
    type: FETCH_REQUESTS_ERROR,
    payload: error
  };
};
