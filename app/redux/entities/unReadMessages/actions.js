export const FETCH_UNREAD_MESSAGES = "FETCH_UNREAD_MESSAGES";
export const IS_FETCHING_UNREAD_MESSAGES = "IS_FETCHING_UNREAD_MESSAGES";
export const FETCH_UNREAD_MESSAGES_SUCCESS = "FETCH_UNREAD_MESSAGES_SUCCESS";
export const FETCH_UNREAD_MESSAGES_FAIL = "FETCH_UNREAD_MESSAGES_FAIL";



export const RESET_UNREAD_MESSAGES = "RESET_UNREAD_MESSAGES";

export function fetch() {
  return {
    type: FETCH_UNREAD_MESSAGES
  };
}

export function isFetching() {
  return {
    type: IS_FETCHING_UNREAD_MESSAGES
  };
}

export function fetchSuccess(payload) {
  return {
    type: FETCH_UNREAD_MESSAGES_SUCCESS,
    payload: payload
    //currentPage: args.pageCount
  };
}

export function fetchFail(error) {
  return {
    type: FETCH_UNREAD_MESSAGES_FAIL,
    payload: error
    //currentPage: args.pageCount
  };  
}


export const UPDATE_MESSAGES_READ_STATUS = 'UPDATE_MESSAGES_READ_STATUS'
export const IS_UPDATING_MESSAGES_READ_STATUS = 'IS_UPDATING_MESSAGES_READ_STATUS'
export const UPDATED_MESSAGES_READ_STATUS = 'UPDATED_MESSAGES_READ_STATUS'
export const UPDATE_MESSAGES_READ_STATUS_FAIL = 'UPDATE_MESSAGES_READ_STATUS_FAIL'


export const update = () => {
    return {
        type: UPDATE_MESSAGES_READ_STATUS,        
    }
}

export const isUpdating = () => {
    return {
        type: IS_UPDATING_MESSAGES_READ_STATUS,        
    }
}

export const updateSuccess = (payload) => {
    return {
        type: UPDATED_MESSAGES_READ_STATUS,
        payload:payload
    }
}

export const updateFail = (error) => {
    return {
        type: UPDATE_MESSAGES_READ_STATUS_FAIL,
        payload: error
    }
}




export function reset() {
  return {
    type: RESET_UNREAD_MESSAGES    
  };  
}

