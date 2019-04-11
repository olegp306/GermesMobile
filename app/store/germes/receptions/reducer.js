import {
  RECEPTION_GET,
  RECEPTION_GET_SUCCESS,
  RECEPTION_GET_FAIL
} from "./actions.js";

import { Map } from "immutable";

const initialState = new Map({
  items: {},
  isFetching: false,
  fetched: false,
  error: null,

  refreshing: false
});

export default (receptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEPTION_GET:
      return state.merge({ isFetching: true, fetched: false, error: null });

    case RECEPTION_GET_SUCCESS:
      return state.merge({
        isFetching: false,
        fetched: true,
        items: action.payload
      });

    case RECEPTION_GET_FAIL:
      return state.merge({ isFetching: false, error: action.payload });

    default:
      return state;
  }
});
