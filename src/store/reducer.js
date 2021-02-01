// import { combineReducers } from "redux"
import { combineReducers } from "redux-immutable"
import { reducer as recommendReducer } from "../app/Recommend/store/index"

export default combineReducers({
  recommend: recommendReducer,
})
