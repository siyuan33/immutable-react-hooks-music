import React, { memo, useEffect } from "react"
import Slider from "@/components/Slider"
import List from "@/components/List.js"
import Scroll from "@/baseUI/Scroll.js"
import { Content } from "./style"
import * as actions from "./store/actions.js"
import { connect } from "react-redux"

function Recommend(props) {
  const { bannerList, recommendList } = props

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect(() => {
    getBannerDataDispatch()
    getRecommendListDataDispatch()
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []
  return (
    <Content className={"Content"}>
      <Scroll className="list">
        <div>
          <Slider list={bannerListJS}></Slider>
          <List recommendList={recommendListJS}></List>
        </div>
      </Scroll>
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
})
// 映射 dispatch 到 props 上
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
