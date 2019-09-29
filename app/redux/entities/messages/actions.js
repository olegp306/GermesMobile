// https://medium.freecodecamp.org/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d



export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const IS_FETCHING_MESSAGES = "IS_FETCHING_MESSAGES";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAIL = "FETCH_MESSAGES_FAIL";

export const ADD_NEW_MESSAGE_IN_MESSAGES_LIST = "ADD_NEW_MESSAGE_IN_MESSAGES_LIST";

export const RESET_MESSAGES = "RESET_MESSAGES";

export function fetch() {
  return {
    type: FETCH_MESSAGES
  };
}

export function isFetching() {
  return {
    type: IS_FETCHING_MESSAGES
  };
}


export function fetchSuccess(payload) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: payload
    //currentPage: args.pageCount
  };
}

export function fetchFail(error) {
  return {
    type: FETCH_MESSAGES_FAIL,
    payload: error
    //currentPage: args.pageCount
  };  
}


export function addNewMessageInMesssageList(message) {
  return {
    type: ADD_NEW_MESSAGE_IN_MESSAGES_LIST,
    payload: { message }
  };
}


export function reset() {
  return {
    type: RESET_MESSAGES    
  };  
}

