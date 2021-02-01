import React, { memo } from "react"
import { ListWrapper, ListItem, List } from "./style"
import { getCount } from "@/utils"
import LazyLoad from "react-lazyload"

function ListContainer(props) {
  const { recommendList } = props
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {recommendList.map((item, index) => {
          return (
            <ListItem key={item.id}>
              <div className="img_wrapper">
                <div className="decorate"></div>
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
                    src={item.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="网易音乐"
                  />
                </LazyLoad>

                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}

export default memo(ListContainer)
