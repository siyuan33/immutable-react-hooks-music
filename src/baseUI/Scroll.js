import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
} from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import styled from "styled-components"
import { forceCheck } from "react-lazyload"
import Loading from "./Loading"
import LoadingV2 from "./Loading-v2.jsx"
import { debounce } from "@/utils"

// 测试 console.log开关
const consoleLogToggleSwitch = true

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState()

  const scrollContaninerRef = useRef()

  const { direction, click, refresh, bounceTop, bounceBottom } = props

  const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props
  const { LoadingActive } = props
  // bs 实例
  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
  }, [])
  // 滑动回调
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on("scroll", (scroll) => {
      onScroll(scroll)
    })
    return () => {
      bScroll.off("scroll")
    }
  }, [onScroll, bScroll])
  // 上拉回调
  const pullUpMemo = useMemo(() => {
    return debounce(pullUp, 300)
  }, [pullUp])
  const pullDownMemo = useMemo(() => {
    return debounce(pullDown, 300)
  }, [pullDown])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    bScroll.on("scrollEnd", () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY) {
        pullUpMemo()
      }
    })
    return () => {
      bScroll.off("scrollEnd")
    }
  }, [pullUp, bScroll])
  // 下拉回调
  useEffect(() => {
    if (!bScroll || !pullDown) return
    bScroll.on("touchEnd", (pos) => {
      //判断用户的下拉动作
      if (pos.y > 30) {
        pullDownMemo()
      }
    })
    return () => {
      bScroll.off("touchEnd")
    }
  }, [pullDown, bScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    },
  }))

  const PullUpdisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" }
  const PullDowndisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" }
  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* <div style={PullUpdisplayStyle}>
        <Loading></Loading>
      </div> */}
      {/* <div style={PullDowndisplayStyle}> */}
      {LoadingActive ? <LoadingV2></LoadingV2> : null}
      {/* </div> */}
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: forceCheck,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: (scroll) =>
    consoleLogToggleSwitch ? console.log(scroll, "scroll") : null,
  bounceTop: true,
  bounceBottom: true,
  LoadingActive: false,
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,
  bounceBottom: PropTypes.bool,
  LoadingActive: PropTypes.bool,
}

export default Scroll
