import {
    MESSAGE_POST,
    MESSAGE_POST_SUCCESS,
    MESSAGE_POST_FAIL,
} from './actions.js'

import { Map } from 'immutable'

const initialState =new Map({
    item:{},        
    isAdding: false,
    added: false,
    error: null 
  });


  
  export default messageReducer = (state = initialState, action) => {    
    switch (action.type){

        case MESSAGE_POST:
            return state.merge({isAdding: true, added: false, error: null})

        case MESSAGE_POST_SUCCESS:
            return state.merge({isAdding: false, added: true, item: action.payload} )
            
        case MESSAGE_POST_FAIL:
            return state.merge({isAdding: false, error: action.payload})
        
        default: return state
    }
}
