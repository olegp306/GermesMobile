import {
    CURRENTUSER_GET,
    CURRENTUSER_GET_SUCCESS,
    CURRENTUSER_GET_FAIL
} from './actions.js'

import { Map } from 'immutable'

const initialState =new Map({
    item:{},        
    isFetching: false,
    fetched: false,
    error: null,

    //currentUser : null
  });


  
  export default currentUserReducer = (state = initialState, action) => {    
    switch (action.type){

        case CURRENTUSER_GET:
            return state.merge({isFetching: true, fetched: false, error: null})

        case CURRENTUSER_GET_SUCCESS:
            return state.merge({isFetching: false, fetched: true, item: action.payload} )
            
        case CURRENTUSER_GET_FAIL:
            return state.merge({isFetching: false, error: action.payload})
        
        default: return state
    }
}
