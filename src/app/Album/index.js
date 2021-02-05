import React, { memo, useState, useCallback } from "react"
import styled from "styled-components"
import style from "@/assets/global-style"
import { CSSTransition } from "react-transition-group"
import Header from "./Header"
import Scroll from "@/baseUI/Scroll"
import { currentAlbum } from "./mock"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: #fff;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: translate3d(100%, 0, 0);
    opacity: 0.9;
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.6s, opacity 0.6s;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  &.fly-exit {
    transform: translate3d(0, 0, 0);
    opacity: 0.9;
  }
  &.fly-exit-active {
    transition: transform 0.6s, opacity 0.6s;
    transform: translate3d(100%, 0, 0);
  }
`
const TopDesc = styled.div`
  background-size: 100%;
  padding: 5px 20px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  position: relative;
  .background {
    z-index: -1;
    background: url (${(props) => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur (20px);
    .filter {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba (7, 17, 27, 0.2);
    }
  }
  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient
        (hsla (0, 0%, 43%, 0.4), hsla (0, 0%, 100%, 0));
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      color: ${style["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style["font-size-l"]};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${style["font-size-m"]};
        color: ${style["font-color-desc-v2"]};
      }
    }
  }
`
const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;
  > div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size: ${style["font-size-s"]};
    color: ${style["font-color-light"]};
    z-index: 1000;
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`


function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  const ClickCallback = useCallback(() => {
    setShowStatus(false)
  }, [])
  return (
    <CSSTransition
      in={showStatus}
      timeout={600}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header ClickCallback={ClickCallback} title={"返回首页"}></Header>
        <Scroll bounceTop={false}>
          <div>
            <TopDesc background={currentAlbum.coverImgUrl}>
              <div className="background">
                <div className="filter"></div>
              </div>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <img src={currentAlbum.coverImgUrl} alt="" />
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">
                    {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万{" "}
                  </span>
                </div>
              </div>
              <div className="desc_wrapper">
                <div className="title">{currentAlbum.name}</div>
                <div className="person">
                  <div className="avatar">
                    <img src={currentAlbum.creator.avatarUrl} alt="" />
                  </div>
                  <div className="name">{currentAlbum.creator.nickname}</div>
                </div>
              </div>
            </TopDesc>
            <Menu>
              <div>
                <i className="iconfont">&#xe6ad;</i>
                评论
              </div>
              <div>
                <i className="iconfont">&#xe86f;</i>
                点赞
              </div>
              <div>
                <i className="iconfont">&#xe62d;</i>
                收藏
              </div>
              <div>
                <i className="iconfont">&#xe606;</i>
                更多
              </div>
            </Menu>
          </div>
        </Scroll>
      </Container>
    </CSSTransition>
  )
}
export default memo(Album)
