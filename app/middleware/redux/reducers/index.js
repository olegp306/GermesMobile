// корневой реьюсер
// корневой редьюсер - это и есть представление всего нашего состояния приложения (то есть, всего нашего store).

// В дальнейшем мы будем комбинировать редьюсеры в корневом редьюсере, 

import { combineReducers } from 'redux'
import { filterReducer } from './Filter'
import  requestsReducer  from './Requests'
import  sessionReducer  from './Session'
import {selectedItemsReducer} from './SelectedItems'
import {barcodesReducer} from './Barcodes'



export const rootReducer = combineReducers({
  filter: filterReducer,
  requests: requestsReducer,
  session: sessionReducer,
  selectedItems: selectedItemsReducer,
  barcodes: barcodesReducer
})


  