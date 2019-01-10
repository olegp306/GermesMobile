import { createStore , applyMiddleware } from 'redux'

import Reactotron from '../../ReactotronConfig.js'
import { rootReducer  } from './reducers.js'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


//  сигнатура функции createStore:
// первый аргумент - функция-обработчик изменений (редьюсер)
// второй аргумент - начальное состояние

export const store = Reactotron.createStore(rootReducer , applyMiddleware(thunk, logger))
