import React, { memo, useState } from "react"
import Horizen from "@/baseUI/Horizen-item.js"
import { categoryTypes, alphaTypes } from "@/api/config"
import styled from "styled-components"

const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`

function Singers() {
  let [category, setCategory] = useState("")
  let [alpha, setAlpha] = useState("")

  let handleUpdateAlpha = (val) => {
    setAlpha(val)
  }

  let handleUpdateCatetory = (val) => {
    setCategory(val)
  }

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={handleUpdateCatetory}
        oldVal={category}
      ></Horizen>
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={(val) => handleUpdateAlpha(val)}
        oldVal={alpha}
      ></Horizen>
    </NavContainer>
  )
}

export default memo(Singers)
