import { Map } from "immutable";
import { SET_CURRENT_CHAT, UPDATE_CURRENT_CHAT } from "../actions/chatApp";

const initialState = Map({
  currentChat: null
  // payload: [],
  // isFetching: false,
  // fetched: false,
  // error: null
});

export default function chatAppReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return state.merge({
        currentChat: action.payload
      });

    case UPDATE_CURRENT_CHAT:
      return state.merge({
        // currentChat: action.payload
      });
    default:
      return state;
  }
}
