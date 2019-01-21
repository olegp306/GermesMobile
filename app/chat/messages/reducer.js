import {
    MESSAGES_GET,
    MESSAGES_GET_SUCCESS,
    MESSAGES_GET_FAIL,
    MESSAGES_ADD_NEW
} from './actions.js'

import { Map } from 'immutable'

const initialState =new Map({
    items:{},        
    isFetching: false,
    fetched: false,
    error: null ,

    refreshing: false
  });

  
  export default messagesReducer = (state = initialState, action) => {    
    switch (action.type){

        case MESSAGES_GET:
            return state.merge({isFetching: true, fetched: false, error: null})

        case MESSAGES_GET_SUCCESS:
            return state.merge({isFetching: false, fetched: true, items: action.payload} )
            
        case MESSAGES_GET_FAIL:
            return state.merge({isFetching: false, error: action.payload})
        

        case MESSAGES_ADD_NEW:
            return state.mergeIn(['items',action.payload.tempFrontId],action.payload)
            
        default: return state
    }
}
