import {
    CHAT_SET_CURRENT,

    CHATS_GET_BY_REQUESTID,
    CHATS_GET_BY_REQUESTID_SUCCESS,
    CHATS_GET_BY_REQUESTID_FAIL,
    // CHAT_POST,
    // CHAT_POST_SUCCESS,
    // CHAT_POST_FAIL,
} from './actions.js'

import { Map } from 'immutable'

const initialState =new Map({
    items:{},        
    isAdding: false,
    added: false,
    error: null,
    
    requestChats:{},

    currentChat:null
  });


  
  export default chatReducer = (state = initialState, action) => {    
    switch (action.type){

        case CHAT_SET_CURRENT:
            return state.merge({currentChat: action.chat})


        case CHATS_GET_BY_REQUESTID:
            return state.merge({isFetching: true, fetched: false, error: null})

        case CHATS_GET_BY_REQUESTID_SUCCESS:
            return state.merge({isFetching: false, fetched: true, requestChats: action.payload} )
            
        case CHATS_GET_BY_REQUESTID_FAIL:
            return state.merge({isFetching: false, error: action.payload})
        
        default: return state
    }
}
