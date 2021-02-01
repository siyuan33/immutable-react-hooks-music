import * as actionTypes from "./actionTypes.js"
import { fromJS } from "immutable" // 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
})

// 获取 immutable 的 状态使用 get api 修改 使用 set api
export default (state = defaultState, { type, data }) => {
  switch (type) {
    case actionTypes.CHANGE_BANNER:
      return state.set("bannerList", data)
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set("recommendList", data)
    default:
      return state
  }
}
