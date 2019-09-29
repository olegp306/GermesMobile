import { Map } from "immutable";

import {
  FETCH_CHATS,
  IS_FETCHING_CHATS,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAIL,
  UPDATE_DATA_VIEW_CHATS,
  RESET_CHATS
} from "../chats/actions";

const initialState = Map({
  items: [],
  isFetching: false,
  fetched: false,
  error: null
});

export default function chatsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHATS:
      return state.merge({ isFetching: false, error: null });

    case IS_FETCHING_CHATS:
      return state.merge({ isFetching: true });

    case FETCH_CHATS_SUCCESS:
      return state.merge({
        isFetching: false,
        fetched: true,
        items: [...action.payload]
      });

    case FETCH_CHATS_FAIL:
      return state.merge({ isFetching: false, error: action.payload });
    //   return { ...state, error: action.error, isFetching: false };

    case UPDATE_DATA_VIEW_CHATS:
      return state.merge({
        isFetching: false,
        fetched: true,
        items: [...action.payload]
      });


    case RESET_CHATS:
      return { ...state, ...initialState };

    default:
      return state;
  }
}
