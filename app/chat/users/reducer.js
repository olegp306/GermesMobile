import {
    USERS_GET,
    USERS_GET_SUCCESS,
    USERS_GET_FAIL,
} from './actions.js'

import { Map } from 'immutable'

const initialState =new Map({
    items:{},        
    isFetching: false,
    fetched: false,
    error: null 
  });


  
  export default usersReducer = (state = initialState, action) => {    
    switch (action.type){

        case USERS_GET:
            return state.merge({isFetching: true, fetched: false, error: null})

        case USERS_GET_SUCCESS:
            return state.merge({isFetching: false, fetched: true, items: action.payload} )
            
        case USERS_GET_FAIL:
            return state.merge({isFetching: false, error: action.payload})
        
        default: return state
    }
}
