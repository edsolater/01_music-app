import { axiosInstance } from '../$axiosInstance'
export const requestPlaylistDetail = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}
