import { Map } from "immutable";

import {
  FETCH_UNREAD_MESSAGES,
  IS_FETCHING_UNREAD_MESSAGES,
  FETCH_UNREAD_MESSAGES_SUCCESS,
  FETCH_UNREAD_MESSAGES_FAIL,
  // RESET_UNREAD_MESSAGES,
  UPDATE_MESSAGES_READ_STATUS,
  IS_UPDATING_MESSAGES_READ_STATUS,
  UPDATED_MESSAGES_READ_STATUS,
  UPDATE_MESSAGES_READ_STATUS_FAIL
} from "../unReadMessages/actions";

const initialState = Map({
  items: [],
  isFetching: false,
  fetched: false,
  error: null,

  isUpdating: false,
  updated:false


});

export default function unReadMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_UNREAD_MESSAGES:
      return state.merge({ isFetching: false, error: null });

    case IS_FETCHING_UNREAD_MESSAGES:
      return state.merge({ isFetching: true });

    case FETCH_UNREAD_MESSAGES_SUCCESS:
      return state.merge({
        isFetching: false,
        fetched: true,
        items: [...action.payload]
      });

    case FETCH_UNREAD_MESSAGES_FAIL:
      return state.merge({ isUpdating: false, error: action.payload });

    case UPDATE_MESSAGES_READ_STATUS:
      return state.merge({ isUpdating: false, error: null });

    case IS_UPDATING_MESSAGES_READ_STATUS:
      return state.merge({ isUpdating: true });

    case UPDATED_MESSAGES_READ_STATUS:
      return state.merge({
        isUpdating: false,
        updated: true,
        
      });

    case UPDATE_MESSAGES_READ_STATUS_FAIL:
      return state.merge({ isAdding: false, error: action.payload });

    // case RESET_UNREAD_MESSAGES:
    //   return { ...state, ...initialState };

    default:
      return state;
  }
}
