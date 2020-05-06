import { axiosInstance } from '../$axiosInstance'

/**
 * 获取用户歌单
 * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
 * @param params.id  歌单 id
 * @param params.s  歌单最近的 s 个收藏者
 */
export const requestPlaylistDetail = (params: { id?: number; s?: number } = {}) => {
  return axiosInstance.get(`/playlist/detail`, { params })
}
