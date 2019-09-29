export const FETCH_APPCHAT_DATA = "FETCH_APPCHAT_DATA";
export const FETCH_APPCHAT_DATA_SUCCESS = "FETCH_APPCHAT_DATA_SUCCESS";
export const FETCH_APPCHAT_DATA_FAIL = "FETCH_APPCHAT_DATA_FAIL";

export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
export const UPDATE_CURRENT_CHAT = "UPDATE_CURRENT_CHAT";

export const NEW_MESSAGE_RECIEVED = "NEW_MESSAGE_RECIEVED";
export const NEW_CHAT_RECIEVED = "NEW_CHAT_RECIEVED";
export const NEW_USERS_IN_CHAT_RECIEVED = "NEW_USERS_IN_CHAT_RECIEVED";

export const NEW_MESSAGE_STATUS_INFO_RECIEVED =
  "NEW_MESSAGE_STATUS_INFO_RECIEVED";

// export const RESET_APPCHAT_DATA = "RESET_APPCHAT_DATA";

export function fetch(userId) {
  return {
    type: FETCH_APPCHAT_DATA,
    payload: { userId: userId }
  };
}

export function fetchSuccess(payload) {
  return {
    type: FETCH_APPCHAT_DATA_SUCCESS,
    payload: payload
    //currentPage: args.pageCount
  };
}

export function fetchFail(error) {
  return {
    type: FETCH_APPCHAT_DATA_FAIL,
    payload: error
    //currentPage: args.pageCount
  };
}

export function setCurrentChat(chat) {
  return {
    type: SET_CURRENT_CHAT,
    payload: chat
    //currentPage: args.pageCount
  };
}

export function updateCurrentChat(chat) {
  return {
    type: UPDATE_CURRENT_CHAT,
    payload: chat
    //currentPage: args.pageCount
  };
}

export function newMessageRecieved(message) {
  return {
    type: NEW_MESSAGE_RECIEVED,
    payload: message
  };
}
export function newChatRecieved(chat) {
  return {
    type: NEW_CHAT_RECIEVED,
    payload: chat
  };
}
export function newUsersInChatRecieved(users) {
  return {
    type: NEW_USERS_IN_CHAT_RECIEVED,
    payload: users
  };
}

export function newMessageStatusRecieved(message) {
  return {
    type: NEW_MESSAGE_STATUS_INFO_RECIEVED,
    payload: message
  };
}

// export function reset() {
//   return {
//     type: RESET_APPCHAT_DATA
//   };
// }
