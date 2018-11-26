import { Map } from 'immutable' 
import { 
    FETCH_REQUESTS_START, 
    IS_REQUESTS_FETCHING, 
    FETCH_REQUESTS_SUCCESS, 
    FETCH_REQUESTS_ERROR
} from './actions.js'


 const initialState =new Map({
    items:{},        
    isFetching: false,
    fetched: false,
    error: null ,

    refreshing: false
  });

 

export default requestsReducer = (state = initialState, action) => {    
    switch (action.type){
        case FETCH_REQUESTS_START:
            return state.merge({isFetching: true, fetched: false, error: null})

        case IS_REQUESTS_FETCHING:
            return state.merge({isFetching: true})

        case FETCH_REQUESTS_SUCCESS:
            return state.merge({isFetching: false, fetched: true, items: action.payload} )

        case FETCH_REQUESTS_ERROR:
            return state.merge({isFetching: false, error: action.payload})

        
        default: return state
    }
}