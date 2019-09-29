import {
  FILE_POST,
  FILE_POST_SUCCESS,
  FILE_POST_FAIL
} from "./actions.js";

import { Map } from "immutable";

const initialState = new Map({
  item: {},
  isFetching: false,
  fetched: false,
  error: null,

  refreshing: false
});

export default (receptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_POST:
      return state.merge({ isFetching: true, fetched: false, error: null });

    case FILE_POST_SUCCESS:
      return state.merge({
        isFetching: false,
        fetched: true,
        item: action.payload
      });

    case FILE_POST_FAIL:
      return state.merge({ isFetching: false, error: action.payload });

    default:
      return state;
  }
});
