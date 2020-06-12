import axiosInstance from './$axiosInstance'
import { meaningful } from 'utils/judger'

/**
 * 喜欢音乐
 * 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
 */
const requestLike = (options: {
  params?: { id?: ID; like?: boolean }
  from?: string
  ignoreCache?: boolean
}) => {
  if (meaningful(options.params?.id)) {
    console.debug(`来自：${options.from || '（未知来源）'} 的 /like 请求`)
    return axiosInstance.get<{}>('/like', {
      params: { ...options.params, timestamp: options.ignoreCache ? Date.now() : undefined }
    })
  } else {
    return undefined
  }
}

export default requestLike
