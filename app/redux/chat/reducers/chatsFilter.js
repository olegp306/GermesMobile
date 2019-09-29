import { Map, List } from "immutable";

import { SET_CHATST_FILTER, RESET_CHATS_FILTER } from "../actions/chatsFilter";

const initialState = Map({
  //   items: List(),
  //   isFetching: false,
  //   fetched: false,
  //   error: null,
  filter: null
});

export default function chatsListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CHATST_FILTER:
      return state.merge({ filter: action.payload });

    case RESET_CHATS_FILTER:
      return state.merge({ filter: null });

    default:
      return state;
  }
}
