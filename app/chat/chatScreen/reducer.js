import {
    CHAT_REQUEST_NOT_FOUND,
    CHAT_REQUEST_EXIST
} from './actions.js'

import { Map } from 'immutable'

const initialState =new Map({

    isRequestChatExist: false

  });


  
  export default chatReducer = (state = initialState, action) => {    
    switch (action.type){

        case CHAT_REQUEST_NOT_FOUND:
            return state.merge({isRequestChatExist: false})

        case CHAT_REQUEST_EXIST:
            return state.merge({isRequestChatExist: true})


        // case CHATS_GET_BY_REQUESTID:
        //     return state.merge({isFetching: true, fetched: false, error: null})

        // case CHATS_GET_BY_REQUESTID_SUCCESS:
        //     return state.merge({isFetching: false, fetched: true, requestChats: action.payload} )
            
        // case CHATS_GET_BY_REQUESTID_FAIL:
        //     return state.merge({isFetching: false, error: action.payload})
        
        default: return state
    }
}
