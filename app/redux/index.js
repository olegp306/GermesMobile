import { createStore , applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga'


import { rootReducer  } from './reducers.js'
import saga from './chat/saga' 
import thunk from 'redux-thunk'



const sagaMiddleware = createSagaMiddleware()
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [sagaMiddleware,  thunk]
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))


sagaMiddleware.run(saga)

// export const store = createStore(rootReducer , composeWithDevTools(applyMiddleware(thunk, logger)))

export { store }
