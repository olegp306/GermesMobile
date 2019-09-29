// корневой реьюсер
// корневой редьюсер - это и есть представление всего нашего состояния приложения (то есть, всего нашего store).

// В дальнейшем мы будем комбинировать редьюсеры в корневом редьюсере, 

import { combineReducers } from 'redux'
import { filterReducer } from './germes/filter/reducer.js'
import  requestsReducer  from './germes/requests/reducer.js'
import  sessionReducer  from './session/reducer.js'
import {selectedItemsReducer} from './germes/selectedItems/reducer.js'
import {barcodesReducer} from './germes/barcodes/reducer.js'

import  messagesReducer  from '../chat/messages/reducer.js'
import  messageReducer  from '../chat/message/reducer.js'

import usersReducer  from '../chat/users/reducer.js'

import currentUserReducer from '../chat/currentUser/reducer'
import chatReducer  from '../chat/chat/reducer.js'
import currentChatReducer  from '../chat/currentChat/reducer'
import receptionReducer from './germes/receptions/reducer'
import fileReducer from './germes/file/reducer'

import chatAppReducers from "./chat/reducers/index"



export const rootReducer = combineReducers({
  filter: filterReducer,
  requests: requestsReducer,
  session: sessionReducer,
  selectedItems: selectedItemsReducer,
  barcodes: barcodesReducer,
  receptions: receptionReducer,
  file: fileReducer,

  currentUser:  currentUserReducer,  
  messages : messagesReducer,
  users : usersReducer,
  message : messageReducer, 
  
  chat : chatReducer,
  currentChat: currentChatReducer,

  chatAppReducers:chatAppReducers


})


  