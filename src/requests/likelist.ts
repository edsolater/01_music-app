import axiosInstance from './$axiosInstance'
import { isMeaningful } from 'utils/judger'

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 * 说明 : 登陆后调用此接口 , 可以获取用户信息
 */
const requestLikelist = (params: { uid: ID | undefined }) => {
  if (isMeaningful(params.uid)) {
    return axiosInstance.get<{
      ids: ID[]
      checkPoint: 1588864548387
      code: 200
    }>('/likelist', { params })
  } else {
    return Promise.reject()
  }
}

export default requestLikelist
