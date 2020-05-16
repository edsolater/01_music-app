import axiosInstance from './$axiosInstance'

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 * 说明 : 登陆后调用此接口 , 可以获取用户信息
 */
const requestLikelist = (params: { uid?: string | number } = {}) =>
  axiosInstance.get<{
    ids: ID[]
    checkPoint: 1588864548387
    code: 200
  }>('/likeList', { params })

export default requestLikelist
