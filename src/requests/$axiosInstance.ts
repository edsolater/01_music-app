import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})
export default axiosInstance

export const requestSingerList = (category, alpha, count) =>
  axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`)

export const requestRankList = () => {
  return axiosInstance.get(`/toplist/detail`)
}

export const requestAlbumDetail = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}

export const requestSingerInfo = (id) => {
  return axiosInstance.get(`/artists?id=${id}`)
}

export const requestLyric = (id) => {
  return axiosInstance.get(`/lyric?id=${id}`)
}

export const requestHotKeyWords = () => {
  return axiosInstance.get(`/search/hot`)
}

export const requestSuggestList = (query) => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`)
}

export const requestResultSongsList = (query) => {
  return axiosInstance.get(`/search?keywords=${query}`)
}

export const requestSongDetail = (id) => {
  return axiosInstance.get(`/song/detail?ids=${id}`)
}
