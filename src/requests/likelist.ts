import axiosInstance from './$axiosInstance'
import { meaningful } from 'utils/judger'

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 * 说明 : 登陆后调用此接口 , 可以获取用户信息
 */
const requestLikelist = (options: {
  params?: { uid?: ID | undefined }
  from?: string
  ignoreCache?: boolean
}) => {
  if (meaningful(options?.params?.uid)) {
    console.debug(`来自：${options.from ?? '（未知来源）'} 的 /likelist 请求`)
    return axiosInstance.get<{
      ids: ID[]
      checkPoint: 1588864548387
      code: 200
    }>('/likelist', {
      params: { ...options.params, timestamp: options.ignoreCache ? Date.now() : undefined }
    })
  } else {
    return undefined
  }
}

export default requestLikelist
