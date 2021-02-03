import React, { memo, useState, useEffect } from "react"
import Horizen from "@/baseUI/Horizen-item.jsx"
import { categoryTypes, alphaTypes } from "@/api/config"
import styled from "styled-components"
import style from "@/assets/global-style"
import Scroll from "@/baseUI/Scroll"
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList,
} from "./store/actions"
import { connect } from "react-redux"
import Loading from "@/baseUI/Loading"
import LazyLoad, { forceCheck } from "react-lazyload"

// styled
const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`
const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`
const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin: 10px 0 10px 10px;
    color: ${style["font-color-desc"]};
    font-size: ${style["font-size-s"]};
  }
`
const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
    font-weight: 500;
  }
`
const renderSingerList = ({ singerList }) => {
  const list = singerList ? singerList.toJS() : []
  return (
    <List>
      {list.map((item, index) => {
        return (
          <ListItem key={item.accountId + "" + index}>
            <div className="img_wrapper">
              <LazyLoad
                placeholder={
                  <img
                    width="100%"
                    height="100%"
                    src={require("@/assets/images/lazy-music.png")}
                    alt="music"
                  />
                }
              >
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </LazyLoad>
            </div>
            <span className="name">{item.name}</span>
          </ListItem>
        )
      })}
    </List>
  )
}

function Singers(props) {
  let [category, setCategory] = useState("")
  let [alpha, setAlpha] = useState("")
  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
  } = props
  const {
    getHotSingerDispatch,
    updateDispatch,
    pullDownRefreshDispatch,
    pullUpRefreshDispatch,
  } = props

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch()
    }
  }, [])

  let handleUpdateAlpha = (val) => {
    setAlpha(val)
    updateDispatch(category, val)
  }

  let handleUpdateCatetory = (val) => {
    setCategory(val.key)
    updateDispatch(val, alpha)
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount)
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha)
  }

  return (
    <>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类(默认热门):"}
          handleClick={(val) => handleUpdateCatetory(val)}
          oldVal={category}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          handleClick={(val) => handleUpdateAlpha(val)}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
          LoadingActive={true}
        >
          {renderSingerList(props)}
        </Scroll>
        {enterLoading ? <Loading></Loading> : null}
      </ListContainer>
    </>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"]),
})
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0))
      dispatch(changeEnterLoading(true))
      dispatch(getSingerList(category, alpha))
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true))
      dispatch(changePageCount(count + 1))
      if (hot) {
        dispatch(refreshMoreHotSingerList())
      } else {
        dispatch(refreshMoreSingerList(category, alpha))
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0))
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers))
