import {
    CURRENTCHAT_GET_ALL_DATA,
    CURRENTCHAT_GET_ALL_DATA_SUCCESS,
    CURRENTCHAT_GET_ALL_DATA_FAIL,

        
    CHAT_REQUEST_NOT_FOUND,
    CHAT_REQUEST_EXIST,

    
} from './actions.js'

import { Map } from 'immutable'
import { FormValidationMessage } from 'react-native-elements';

const initialState =new Map({
    isRequestChatExist: false,
    isFetching : false,
    item: null

  });


  
  export default chatReducer = (state = initialState, action) => {    
    switch (action.type){

        case CURRENTCHAT_GET_ALL_DATA:
            return state.merge({isFetching: true})

        case CURRENTCHAT_GET_ALL_DATA_SUCCESS:
            return state.merge({isFetching: false})

        case CURRENTCHAT_GET_ALL_DATA_FAIL:
            return state.merge({isFetching: false})


        case CHAT_REQUEST_NOT_FOUND:
            return state.merge({isRequestChatExist: false, item: null})

        case CHAT_REQUEST_EXIST:
            return state.merge({isRequestChatExist: true, item: action.payload})

        
        // case CHATS_GET_BY_REQUESTID:
        //     return state.merge({isFetching: true, fetched: false, error: null})

        // case CHATS_GET_BY_REQUESTID_SUCCESS:
        //     return state.merge({isFetching: false, fetched: true, requestChats: action.payload} )
            
        // case CHATS_GET_BY_REQUESTID_FAIL:
        //     return state.merge({isFetching: false, error: action.payload})
        
        default: return state
    }
}
