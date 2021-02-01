import styled from "styled-components"
import style from "@/assets/global-style"

const background = `${style["theme-color"]}`

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  &::before {
    position: absolute;
    top: 0;
    bottom: 20%;
    width: 100%;
    background: ${background};
    content: "";
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
    }
    .swiper-pagination-bullet-active {
      background: ${background};
    }
  }
`
