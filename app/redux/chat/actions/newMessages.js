export const CHANGE_NEW_MESSAGE = "CHANGE_NEW_MESSAGE";
export const CLEAN_NEW_MESSAGE = "CLEAN_NEW_MESSAGE";

export function changeNewMessage(message) {
  return {
    type: CHANGE_NEW_MESSAGE,
    payload: message
  };
}

export function cleanNewMessage(chatId) {
  return {
    type: CLEAN_NEW_MESSAGE,
    payload: { chatId }
  };
}

export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
export const IS_ADDING_NEW_MESSAGE = 'IS_ADDING_NEW_MESSAGE'
export const ADDED_NEW_MESSAGE = 'ADDED_NEW_MESSAGE'
export const ADD_NEW_MESSAGE_FAIL = 'ADD_NEW_MESSAGE_FAIL'



export const add = (payload) => {
    return {
        type: ADD_NEW_MESSAGE,     
        payload:payload   
    }
}

export const isAdding = (payload) => {
    return {
        type: IS_ADDING_NEW_MESSAGE,        
        payload:payload
    }
}

export const addSuccess = (payload) => {
    return {
        type: ADDED_NEW_MESSAGE,
        payload:payload
    }
}

export const addFail = (error) => {
    return {
        type: ADD_NEW_MESSAGE_FAIL,
        payload: error
    }
}


