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



export const rootReducer = combineReducers({
  filter: filterReducer,
  requests: requestsReducer,
  session: sessionReducer,
  selectedItems: selectedItemsReducer,
  barcodes: barcodesReducer,

  messages : messagesReducer
})


  