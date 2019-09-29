export const SELECT_USER = 'SELECT_USER'
export const UNSELECT_USER = 'UNSELECT_USER'

export const ADD_SELECTED_USERS_TO_CHAT = 'ADD_SELECTED_USERS_TO_CHAT'
export const IS_ADDDING_SELECTED_USERS_TO_CHAT = 'IS_ADDDING_SELECTED_USERS_TO_CHAT'
export const ADDED_SELECTED_USERS_TO_CHAT = 'ADDED_SELECTED_USERS_TO_CHAT'
export const ADD_SELECTED_USERS_TO_CHAT_FAIL = 'ADD_SELECTED_USERS_TO_CHAT_FAIL'

export const SET_USERS_LIST_FILTER = "SET_USERS_LIST_FILTER";
export const RESET_USERS_LIST_FILTER = "RESET_USERS_LIST_FILTER";



//export const CLEAR_FLAGS = 'clearAddedFlag'

export const add = () => {
    return {
        type: ADD_SELECTED_USERS_TO_CHAT,        
    }
}

export const isAdding = () => {
    return {
        type: IS_ADDDING_SELECTED_USERS_TO_CHAT,        
    }
}

export const addSuccess = (payload) => {
    return {
        type: ADDED_SELECTED_USERS_TO_CHAT,
        payload:payload
    }
}

export const addFail = (error) => {
    return {
        type: ADD_SELECTED_USERS_TO_CHAT_FAIL,
        payload: error
    }
}


export const selectUser = (userId) => {
    return {
        type: SELECT_USER,
        payload: userId
    }
}

export const unSelectUser = (userId) => {
    return {
        type: UNSELECT_USER,
        payload: userId
    }
}


export function setUsersListFilter(payload) {
    return {
      type: SET_USERS_LIST_FILTER,
      payload
    };
  }
  
  export function resetUsersListFilter() {
    return {
      type: RESET_USERS_LIST_FILTER
    };
  }
  
  