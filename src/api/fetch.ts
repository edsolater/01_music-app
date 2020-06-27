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
      type?: ID /* type:资源类型,对应以下类型,默认为 0 即 PC
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
  /**
   * 独家放送(入口列表)
   */
  '/personalized/privatecontent': {
    params: {}
    response: {
      result: ExclusiveContent[]
      code: 200
    }
  }
  /**
   * 新歌速递
   */
  '/top/song': {
    params: {
      /**
       * type: 地区类型 id,对应以下:
       * 全部:0
       * 华语:7
       * 欧美:96
       * 日本:8
       * 韩国:16
       */
      type?: ID
    }
    response: {
      data: TopSong[]
      code: 200
    }
  }

  /**
   * 推荐mv
   */
  '/personalized/mv': {
    params: {}
    response: {
      result: MVIntro[]
      code: 200
    }
  }
  /**
   *  新晋电台榜/热门电台榜
   */
  '/dj/toplist': {
    params: { /** 类型：新/热门 */ type?: 'new' | 'hot' }
    response: {
      toplist: DJRankItemIntro[]
      code: 200
      /**数据刷新时间 */
      updateTime: TimeNumber
    }
  }
  /**
   *  电台-今日优选
   */
  '/dj/today/perfered': {
    params: {}
    response: {
      data: DJItemIntro[]
      code: 200
    }
  }
  /**
   * mv 列表（各种列表都是这个接口）
   */
  '/mv/all': {
    params: {
      /** 排序,不填则为上升最快 */
      order?: '上升最快' | '最热' | '最新'
      /** 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 */
      area?: '全部' | '内地' | '港台' | '欧美' | '日本' | '韩国'
      /** 取出数量 , 默认为 30 */
      limit?: number
      /** 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0 */
      offset?: number
    }
    response: {
      data: MVIntro2[]
      code: 200
      hasMore: boolean
      count: number
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
  '/recommend/resource': params => axiosInstance.get('/recommend/resource', { params }),
  '/personalized/privatecontent': params =>
    axiosInstance.get('/personalized/privatecontent', { params }),
  '/top/song': params => axiosInstance.get('/top/song', { params }),
  '/personalized/mv': params => axiosInstance.get('/personalized/mv', { params }),
  '/dj/toplist': params => axiosInstance.get('/dj/toplist', { params }),
  '/dj/today/perfered': params => axiosInstance.get('/dj/today/perfered', { params }),
  '/mv/all': params => axiosInstance.get('/mv/all', { params })
}
//#endregion

function fetch<T extends keyof RequestParams>(
  url: T,
  params?: RequestParams[T]['params'],
  options?: RequestOptions
): Promise<AxiosResponse<RequestParams[T]['response']>> | undefined {
  //@ts-expect-error
  return requestTable[url](params, options)
}

export default fetch
