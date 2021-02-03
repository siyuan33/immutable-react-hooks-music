// import { combineReducers } from "redux"
import { combineReducers } from "redux-immutable"
import { reducer as recommendReducer } from "@/app/Recommend/store/index"
import { reducer as singersReducer } from "@/app/Singers/store/index"
import { reducer as rankReducer } from "@/app/Rank/store/index"

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
})
