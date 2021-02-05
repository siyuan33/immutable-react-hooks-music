import React, { memo } from "react"
import styled from "styled-components"
import style from "../../assets/global-style"
import PropTypes from "prop-types"

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style["font-color-light"]};
  background: ${style["theme-color"]};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${style["font-size-l"]};
    font-weight: 700;
    margin-left: 5vw;
  }
`

const Header = ({ ClickCallback, title }) => {
  return (
    <HeaderContainer>
      <i className="iconfont back" onClick={ClickCallback}>
        &#xe655;
      </i>
      <h1>{title}</h1>
    </HeaderContainer>
  )
}

Header.defaultProps = {
  ClickCallback: () => {},
  title: "title",
}

Header.propTypes = {
  ClickCallback: PropTypes.func,
  title: PropTypes.string,
}

export default Header
