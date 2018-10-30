import { Map } from 'immutable' //нужно для merge
import { 
    FETCH_REQUESTS_START, 
    IS_REQUESTS_FETCHING, 
    FETCH_REQUESTS_SUCCESS, 
    FETCH_REQUESTS_ERROR 
} from '../actions/Requests'


 const initialState =new Map({
    items:{},        
    isFetching: false,
    fetched: false,
    error: null  
  });

  // export function requestsReducer(state = initialState){
  //   return state
  // }
  

export default requestsReducer = (state = initialState, action) => {
    //console.log("requestReducer run with : "+action.type )
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