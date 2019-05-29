import { createStore , applyMiddleware, compose } from 'redux'

import Reactotron from '../../ReactotronConfig.js'
import { rootReducer  } from './reducers.js'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


//  сигнатура функции createStore:
// первый аргумент - функция-обработчик изменений (редьюсер)
// второй аргумент - начальное состояние

// export const store = Reactotron.createStore(rootReducer , applyMiddleware(thunk, logger))

let composseEnhancers=compose;


if(!process.env.NODE_ENV === "production"){
    composseEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
export const store = Reactotron.createStore(rootReducer , composseEnhancers(applyMiddleware(thunk, logger)))