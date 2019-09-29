export const ADD_MESSAGE = 'ADD_MESSAGE'
export const IS_ADDING_MESSAGE = 'IS_ADDING_MESSAGE'
export const ADDED_MESSAGE = 'ADDED_MESSAGE'
export const ADD_MESSAGE_FAIL = 'ADD_MESSAGE_FAIL'

//export const CLEAR_FLAGS = 'clearAddedFlag'

export const add = () => {
    return {
        type: ADD_MESSAGE,        
    }
}

export const isAdding = () => {
    return {
        type: IS_ADDING_MESSAGE,        
    }
}

export const addSuccess = (payload) => {
    return {
        type: ADDED_MESSAGE,
        payload:payload
    }
}

export const addFail = (error) => {
    return {
        type: ADD_MESSAGE_FAIL,
        payload: error
    }
}

