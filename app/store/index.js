import { createStore , applyMiddleware } from 'redux'

import Reactotron from '../../ReactotronConfig.js'
import { rootReducer  } from './reducers.js'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


//Возьми пустую анонимную функцию в качестве редьюсера и пустой объект в качестве начального состояния.
// Если коротко: возьми ничего и "ничего" не делай. Третий параметр может быть каконибудь ЛОГГЕР
//export const store = createStore(() => {}, {})


// Не забывайте, сигнатура функции createStore:
// первый аргумент - функция-обработчик изменений (редьюсер)
// второй аргумент - начальное состояние

export const store = Reactotron.createStore(rootReducer , applyMiddleware(thunk, logger))
