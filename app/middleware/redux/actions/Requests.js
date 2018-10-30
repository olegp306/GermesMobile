export const FETCH_REQUESTS_START = 'FETCH_REQUESTS_START'
export const IS_REQUESTS_FETCHING = 'IS_REQUESTS_FETCHING'
export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS'
export const FETCH_REQUESTS_ERROR = 'FETCH_REQUESTS_ERROR'

import _keyBy from 'lodash'
import api from '../../api'

export const fetchRequests = () => {
    return (dispatch, getState)=>{

        
        //getState можно получить данные из STORE
        dispatch(startFetchRequests());
        
        const {filter}=getState();
        //console.log("ACTION fetchRequests");
        api.fetchRequests(filter.get('filterDate'),filter.get('filterReceptionId'))
        .then(data=>dispatch(requestsFetched(data.data)))
        .catch(error=>requestsFetchingError(error))
    }
 
}

export const startFetchRequests = () => {
    return {
        type: FETCH_REQUESTS_START
    }
}

export const requestsFetched = (items) => {
    return {
        type: FETCH_REQUESTS_SUCCESS,
        payload:api.toAssociativeArray(items,'requestId')
    }
}

export const requestsFetchingError = (error) => {
    return {
        type: FETCH_REQUESTS_ERROR,
        payload: error
    }
}