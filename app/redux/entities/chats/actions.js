export const FETCH_CHATS = "FETCH_CHATS";
export const IS_FETCHING_CHATS = "IS_FETCHING_CHATS";
export const FETCH_CHATS_SUCCESS = "FETCH_CHATS_SUCCESS";
export const FETCH_CHATS_FAIL = "FETCH_CHATS_FAIL";
export const UPDATE_DATA_VIEW_CHATS = "UPDATE_DATA_VIEW_CHATS";



export const RESET_CHATS = "RESET_CHATS";

export function fetch() {
  return {
    type: FETCH_CHATS
  };
}

export function isFetching() {
  return {
    type: IS_FETCHING_CHATS
  };
}


export function fetchSuccess(payload) {
  return {
    type: FETCH_CHATS_SUCCESS,
    payload: payload
    //currentPage: args.pageCount
  };
}

export function fetchFail(error) {
  return {
    type: FETCH_CHATS_FAIL,
    payload: error
    //currentPage: args.pageCount
  };  
}


export function reset() {
  return {
    type: RESET_CHATS    
  };  
}


export function updateDataViewChats(payload) {
  return {
    type: UPDATE_DATA_VIEW_CHATS,
    payload: payload
    //currentPage: args.pageCount
  };
}