import axiosInstance from './$axiosInstance'
import { exist } from 'utils/judger'

/**
 * 喜欢音乐
 * 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
 */
const requestLike = (params: { id: ID | undefined; like?: boolean }) => {
  if (exist(params.id)) {
    return axiosInstance.get<{}>('/like', { params })
  } else {
    return undefined
  }
}

export default requestLike
