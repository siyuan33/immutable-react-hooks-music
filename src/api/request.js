import { axiosInstance } from "./config"

export const getBannerRequest = () => {
  return axiosInstance.get("/banner")
}

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized")
}

// 热门歌手
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

// 歌手列表
export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?type=${category.type}&area=${
      category.area
    }&initial=${alpha.toLowerCase()}&offset=${count}`
  )
}

// 排名
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`)
}
