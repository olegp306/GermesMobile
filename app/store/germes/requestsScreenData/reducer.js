import {
  REQUESTS_SCREEN_DATA_GET,
  REQUESTS_SCREEN_DATA_GET_SUCCESS,
  REQUESTS_SCREEN_DATA_GET_FAIL
} from "./actions.js.js.js";

import { Map } from "immutable";

const initialState = new Map({
  isFetching: false,
  fetched: false,
  error: null,

  refreshing: false
});

export default (receptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTS_SCREEN_DATA_GET:
      return state.merge({ isFetching: true, fetched: false, error: null });

    case REQUESTS_SCREEN_DATA_GET_SUCCESS:
      return state.merge({
        isFetching: false,
        fetched: true,
        
      });

    case REQUESTS_SCREEN_DATA_GET_FAIL:
      return state.merge({ isFetching: false, error: action.payload });

    default:
      return state;
  }
});
