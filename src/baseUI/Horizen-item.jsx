import React, { useState, useRef, useEffect, memo, useContext } from "react"
import styled from "styled-components"
import Scroll from "./Scroll.js"
import { PropTypes } from "prop-types"
import style from "@/assets/global-style"

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  width: 200%;
  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function Horizen(props) {
  const { list, oldVal, title } = props
  const { handleClick } = props
  // 加入声明
  const Category = useRef(null)

  // 加入初始化内容宽度的逻辑
  useEffect(() => {
    let categoryDOM = Category.current
    let tagElems = categoryDOM.querySelectorAll("span")
    let totalWidth = 0
     
    Array.from(tagElems).forEach((ele) => {
      totalWidth += ele.offsetWidth
    })
    categoryDOM.style.width = `${totalWidth}px`
  }, [])

  return (
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List className={"List"}>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem
                key={item.key}
                className={`${oldVal === item.key ? "selected" : ""}`}
                onClick={() =>
                  handleClick({
                    type: item.type,
                    area: item.area,
                    key: item.key,
                  })
                }
              >
                {item.name}
              </ListItem>
            )
          })}
        </List>
      </div>
    </Scroll>
  )
}

// 首先考虑接受的参数
//oldVal 为当前的 item 值
Horizen.defaultProps = {
  list: [],
  oldVal: "",
  title: "",
  handleClick: null,
}

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
}
export default memo(Horizen)
