import { createStore, compose, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import reducer from "./reducer"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//middlewares
const middlewares = [thunkMiddleware]

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

export default store
