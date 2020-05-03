import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
})
export default axiosInstance

export const requestSingerList = (category, alpha, count) =>
  axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`)

export const requestArtist = (id) => {
  return axiosInstance.get(`/artists?id=${id}`)
}

export const requestLyric = (id) => {
  return axiosInstance.get(`/lyric?id=${id}`)
}

export const requestHot = () => {
  return axiosInstance.get(`/search/hot`)
}

export const requestSuggest = (query) => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`)
}

export const requestResult = (query) => {
  return axiosInstance.get(`/search?keywords=${query}`)
}

export const requestSong = (id) => {
  return axiosInstance.get(`/song/detail?ids=${id}`)
}
