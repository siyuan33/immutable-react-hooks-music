import React, { memo } from "react"
import Slider from "@/components/Slider"

function Recommend(props) {
  const list = [1, 2, 3, 4, 5].map((item) => {
    return {
      imgSrc:
        "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
    }
  })
  return (
    <div>
      <Slider list={list}></Slider>
    </div>
  )
}

export default memo(Recommend)
