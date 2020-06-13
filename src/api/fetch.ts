import axios, { AxiosResponse } from 'axios'
import { meaningful } from 'utils/judger'
import { storage } from './localStorage'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true // 需要带入证书信息
})

//#region ------------------- 业务逻辑 -------------------

type RequestOptions = {
  ignoreCache?: boolean
  /* 是否强行请求？默认会3分钟缓存 */ from?: string /* 由哪个组件发起？ */
}
type RequestParams = {
  /**
   * 喜欢音乐
   * 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
   */
  '/like': { params: { id?: ID; like?: boolean }; response: {} }
  /**
   * 获取用户信息 , 歌单，收藏，mv, dj 数量
   * 说明 : 登陆后调用此接口 , 可以获取用户信息
   */
  '/likelist': {
    params: {}
    response: {
      ids: ID[]
      checkPoint: 1588864548387
      code: 200
    }
  }
}
const requestTable: {
  [T in keyof RequestParams]: (
    params?: RequestParams[T]['params'],
    options?: RequestOptions
  ) => Promise<AxiosResponse<RequestParams[T]['response']>> | undefined
} = {
  '/like': params =>
    meaningful(params?.id)
      ? axiosInstance.get('/like', {
          params: { ...params, timestamp: Date.now() }
        })
      : undefined,
  '/likelist': (params, options) =>
    axiosInstance.get('/likelist', {
      params: {
        ...params,
        uid: storage.account().id,
        timestamp: Date.now()
      }
    })
}

//#endregion

function fetch<T extends keyof RequestParams>(
  url: T,
  params?: RequestParams[T]['params'],
  options?: RequestOptions
): Promise<AxiosResponse<RequestParams[T]['response']>> | undefined {
  const result = requestTable[url](params, options)
  if (result) {
    log({ from: options?.from, url: url, ok: true })
    return result
  } else {
    log({ from: options?.from, url: url, ok: false })
    return undefined
  }
}
function log(args?: { from?: string; url: keyof RequestParams; ok: boolean }) {
  console.debug(
    `来自：${args?.from || '（未知来源）'} 的 ${args?.url} 请求.${args?.ok ? '' : '拦截'}`
  )
}

export default fetch
