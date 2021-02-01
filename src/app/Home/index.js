import React, { memo } from "react"
import { renderRoutes } from "react-router-config"
import { Top, Tab, TabItem } from "./style"
import { NavLink } from "react-router-dom"

function Home(props) {
  const {
    route: { children },
  } = props
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">Web App</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      {renderRoutes(children)}
    </div>
  )
}

export default memo(Home)
