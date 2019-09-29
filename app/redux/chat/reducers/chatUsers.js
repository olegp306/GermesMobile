// https://medium.freecodecamp.org/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d
// This reducer pattern defines the changes possible in its search state when the search API is called.
import { Map } from "immutable";

import {
  FETCH_CHAT_USERS,
  IS_FETCHING_CHAT_USERS,
  FETCH_CHAT_USERS_SUCCESS,
  FETCH_CHAT_USERS_FAIL,

  RESET_CHAT_USERS
} from "../actions/chatUsers";

const initialState = Map({
  items: [],
  isFetching: false,  
  fetched: false,
  error: null
});

export default function chatUsersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHAT_USERS:
      return state.merge({ isFetching: false, error: null , fetched: false});

    case IS_FETCHING_CHAT_USERS:
      return state.merge({ isFetching: true });

    case FETCH_CHAT_USERS_SUCCESS:
      return state.merge({
        isFetching: false,
        fetched: true,
        items: [...action.payload]
      });

    case FETCH_CHAT_USERS_FAIL:
      return state.merge({ isFetching: false, error: action.payload, fetched: false });    

    case RESET_CHAT_USERS:
      return { ...state, ...initialState };
      
    default:
      return state;
  }
}
