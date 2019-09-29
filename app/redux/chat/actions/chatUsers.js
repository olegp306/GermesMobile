export const FETCH_CHAT_USERS = "FETCH_CHAT_USERS";
export const IS_FETCHING_CHAT_USERS = "IS_FETCHING_CHAT_USERS";
export const FETCH_CHAT_USERS_SUCCESS = "FETCH_CHAT_USERS_SUCCESS";
export const FETCH_CHAT_USERS_FAIL = "FETCH_CHAT_USERS_FAIL";



export const RESET_CHAT_USERS = "RESET_CHAT_USERS";

export function fetch() {
  return {
    type: FETCH_CHAT_USERS
  };
}

export function isFetching() {
  return {
    type: IS_FETCHING_CHAT_USERS
  };
}


export function fetchSuccess(payload) {
  return {
    type: FETCH_CHAT_USERS_SUCCESS,
    payload: payload
    //currentPage: args.pageCount
  };
}

export function fetchFail(error) {
  return {
    type: FETCH_CHAT_USERS_FAIL,
    payload: error
    //currentPage: args.pageCount
  };  
}


export function reset() {
  return {
    type: RESET_CHAT_USERS    
  };  
}

