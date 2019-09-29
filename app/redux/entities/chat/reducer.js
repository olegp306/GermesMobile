import { Map } from 'immutable'
import { UPDATE_CHAT_REQUEST, IS_UPDATING_CHAT, UPDATED_CHAT, UPDATE_CHAT_FAILED, } from "./actions"
import { ADD_CHAT_REQUEST, IS_ADDING_CHAT, ADDED_CHAT, ADDING_CHAT_FAILED } from './actions'

const initialState = Map({
    item: null,
    isUpdating: false,
    updated: false,
    isAdding: false,
    added: false,
    error: null
})

export default function chatReducer  (state = initialState, action)  {
    switch (action.type){
        
        case UPDATE_CHAT_REQUEST:
            return initialState

        case IS_UPDATING_CHAT:
            return state.merge({ isUpdating: true })

        case UPDATED_CHAT:
            return state.merge({ isUpdating: false, updated: true })

        case UPDATE_CHAT_FAILED:
            return state.merge({ isUpdating: false, error: action.payload })    


        case ADD_CHAT_REQUEST:
            return initialState

        case IS_ADDING_CHAT:
            return state.merge({ isAdding: true })

        case ADDED_CHAT:
            return state.merge({ isAdding: false, added: true })

        case ADDING_CHAT_FAILED:
            return state.merge({ isAdding: false, error: action.payload })
            

        default: return state
    }
}
