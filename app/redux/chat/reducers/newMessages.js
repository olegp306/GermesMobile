import { Map } from "immutable";
import {
  CHANGE_NEW_MESSAGE,
  CLEAN_NEW_MESSAGE,
  ADD_NEW_MESSAGE,
  IS_ADDING_NEW_MESSAGE,
  ADDED_NEW_MESSAGE,
  ADD_NEW_MESSAGE_FAIL
} from "../actions/newMessages";
//import {getCurrentChat} from "../selectors"

const initialState = new Map({
  items: new Map({}),
  isAdding: false,  
  addded: false,
  error: null
});

export default function newMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NEW_MESSAGE: {
      //const curChat=getCurrentChat(store);
      return state.mergeIn(["items", action.payload.chatId], action.payload);
    }

    case CLEAN_NEW_MESSAGE:
      return state.mergeIn(["items", action.payload.chatId], {
        messageText: "",
        type: "",
        chatId: "",
        blob: null
      });

    case ADD_NEW_MESSAGE:
        return state.merge({ isAdding: false, error: null });


    case IS_ADDING_NEW_MESSAGE:
        return state.merge({ isAdding: true });

    case ADDED_NEW_MESSAGE:
      return state.merge({
        isAdding: false,
        added: true,        
      });

    case ADD_NEW_MESSAGE_FAIL:
        return state.merge({ isAdding: false, error: action.payload });
  
      

    default:
      return state;
  }
}
