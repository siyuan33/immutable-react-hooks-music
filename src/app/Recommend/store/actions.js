import * as actionTypes from "./actionTypes"
import { fromJS } from "immutable" // 将 JS 对象转换成 immutable 对象
import { getBannerRequest, getRecommendListRequest } from "../../../api/request"

export const getBannerList = () => {
  return async (dispatch) => {
    const { banners, code } = await getBannerRequest()
    if (code === 200) {
      dispatch({
        type: actionTypes.CHANGE_BANNER,
        data: fromJS(banners),
      })
    } else {
      console.error("轮播图数据传输错误")
    }
  }
}

export const getRecommendList = () => {
  return async (dispatch) => {
    const { result, code } = await getRecommendListRequest()
    if (code === 200) {
      dispatch({
        type: actionTypes.CHANGE_RECOMMEND_LIST,
        data: fromJS(result),
      })
    } else {
      console.error("推荐歌单数据传输错误")
    }
  }
}
