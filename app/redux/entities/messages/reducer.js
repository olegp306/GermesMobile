// This reducer pattern defines the changes possible in its search state when the search API is called.
import { Map, List } from "immutable";

import {
  FETCH_MESSAGES,
  IS_FETCHING_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  ADD_NEW_MESSAGE_IN_MESSAGES_LIST,
  RESET_MESSAGES
} from "../messages/actions";

const initialState = Map({
  items: List(),
  isFetching: false,
  fetched: false,
  error: null,

  isAdding: false,
  added: false
});

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return state.merge({ isFetching: false, error: null });

    case IS_FETCHING_MESSAGES:
      return state.merge({ isFetching: true });

    case FETCH_MESSAGES_SUCCESS:
      // return state.merge({ isFetching: false });
      return state.merge({
        isFetching: false,
        fetched: true,
        items: List(action.payload)
      });

    case FETCH_MESSAGES_FAIL:
      return state.merge({ isFetching: false, error: action.payload });

    case ADD_NEW_MESSAGE_IN_MESSAGES_LIST:
      return state.updateIn(["items"], items =>
        items.push(action.payload.message)
      );

    case RESET_MESSAGES:
      return { ...state, ...initialState };

    default:
      return state;
  }
}
