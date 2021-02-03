import React, { memo, useEffect } from "react"
import Slider from "@/components/Slider"
import List from "@/components/List.js"
import Scroll from "@/baseUI/Scroll.js"
import Loading from "@/baseUI/Loading.js"
import { Content } from "./style"
import * as actions from "./store/actions.js"
import { connect } from "react-redux"
import { renderRoutes } from "react-router-config"

function Recommend(props) {
  const { bannerList, recommendList, loadingflag } = props

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    console.log(bannerList, recommendList)
    // immutable数据结构中的 size 类似数组的 length 不刷新页面就直接将结果缓存
    if (bannerList.size === 0) {
      getBannerDataDispatch()
    }
    if (recommendList.size === 0) {
      getRecommendListDataDispatch()
    }
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []
  return (
    <Content className={"Content"}>
      {renderRoutes(props.route.children)}
      <Scroll className="list">
        <div>
          <Slider list={bannerListJS}></Slider>
          <List recommendList={recommendListJS}></List>
        </div>
      </Scroll>
      {loadingflag ? <Loading></Loading> : null}
    </Content>
  )
}

// state 和 action 注入到傻瓜组件中
const mapStateToProps = (state) => ({
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  loadingflag: state.getIn(["recommend", "loadingflag"]),
})
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actions.getBannerList())
    },
    getRecommendListDataDispatch() {
      dispatch(actions.getRecommendList(dispatch))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend))
