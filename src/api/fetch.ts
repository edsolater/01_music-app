import axios, { AxiosResponse } from 'axios'
import { meaningful } from 'functions/judger'
import { storage } from 'api/localStorage'

// TODO - 这不是旧时代，gg要使用原生fetch，抛弃axios
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
  /**
   * 获取用户信息 , 歌单，收藏，mv, dj 数量
   * 说明 : 登陆后调用此接口 , 可以获取用户信息
   */
  '/banner': {
    params: {
      type?: number /* type:资源类型,对应以下类型,默认为 0 即 PC
      0: pc
      1: android
      2: iphone
      3: ipad */
    }
    response: {
      banners: Banner[]
      code: 200
    }
  }
  /**
   * 获取每日推荐歌单
   * 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
   */
  '/recommend/resource': {
    params: {}
    response: {
      recommend: RecommendResource[]
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
  '/likelist': params =>
    axiosInstance.get('/likelist', {
      params: {
        ...params,
        uid: storage.account().id,
        timestamp: Date.now()
      }
    }),
  '/banner': params => axiosInstance.get('/banner', { params }),
  '/recommend/resource': params => axiosInstance.get('/recommend/resource', { params })
}
//#endregion

function fetch<T extends keyof RequestParams>(
  url: T,
  params?: RequestParams[T]['params'],
  options?: RequestOptions
): Promise<AxiosResponse<RequestParams[T]['response']>> | undefined {
  return requestTable[url](params, options)
}

export default fetch
