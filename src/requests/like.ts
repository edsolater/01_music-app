import axiosInstance from './$axiosInstance'

/**
 * 喜欢音乐
 * 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
 */
const requestLike = (params: { id?: string | number; like?: boolean } = {}) =>
  axiosInstance.get<{}>('/like', { params })

export default requestLike
