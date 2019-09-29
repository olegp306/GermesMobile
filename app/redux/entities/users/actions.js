export const FETCH_USERS = "FETCH_USERS";
export const IS_FETCHING_USERS = "IS_FETCHING_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";



export const RESET_USERS = "RESET_USERS";

export function fetch() {
  return {
    type: FETCH_USERS
  };
}

export function isFetching() {
  return {
    type: IS_FETCHING_USERS
  };
}


export function fetchSuccess(payload) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: payload
    //currentPage: args.pageCount
  };
}

export function fetchFail(error) {
  return {
    type: FETCH_USERS_FAIL,
    payload: error
    //currentPage: args.pageCount
  };  
}


export function reset() {
  return {
    type: RESET_USERS    
  };  
}

