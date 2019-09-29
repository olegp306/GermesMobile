import { Map } from "immutable";

import {
    ADD_MESSAGE,
    IS_ADDING_MESSAGE,
    ADDED_MESSAGE,
    ADD_MESSAGE_FAIL,
  
} from "../message/actions";

const initialState =new Map({
    item:{},        
    isAdding: false,
    added: false,
    error: null 
  });

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.merge({ isAdding: false, error: null });

    case IS_ADDING_MESSAGE:
      return state.merge({ isAdding: true });

    case ADDED_MESSAGE:
      return state.merge({
        isAdding: false,
        added: true,
        item: action.payload
      });

    case ADD_MESSAGE_FAIL:
      return state.merge({ isAdding: false, error: action.payload });
    

    // case RESET_CHATS:
    //   return { ...state, ...initialState };
      
    default:
      return state;
  }
}
