import React, { useEffect, useState, memo } from "react"
import { SliderContainer } from "./style"
import "swiper/swiper-bundle.css"
import Swiper, { Pagination, Autoplay } from "swiper"
Swiper.use([Pagination, Autoplay])

function Slider(props) {
  const { list: bannerList } = props
  const [swiperInstance, setSwiperInstance] = useState(null)

  useEffect(() => {
    if (bannerList.length && !swiperInstance) {
      let swiperInstance = new Swiper(".slider-container", {
        loop: true,
        autoplay: true,
        pagination: { el: ".swiper-pagination" },
      })
      setSwiperInstance(swiperInstance)
    }
  }, [swiperInstance, bannerList.length])
  return (
    <SliderContainer>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((slider) => {
            return (
              <div
                className="swiper-slide"
                key={slider.imageUrl + Math.random() + Math.random()}
              >
                <div className="slider-nav">
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            )
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default memo(Slider)
