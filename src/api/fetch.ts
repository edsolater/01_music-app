import axios, { AxiosResponse } from 'axios'
import { RequestParams } from './RequestParams'

export type AllResponse = {
  [K in keyof RequestParams]: RequestParams[K]['response']
}
type AdditionalSetting = {
  /**不要缓存（强行请求） */
  nocache?: boolean
}
const additionalRequestConfigs: {
  [requestUrl in keyof RequestParams]?: AdditionalSetting
} = {
  '/like': { nocache: true },
  '/likelist': { nocache: true }
}
//#endregion

// TODO - 这不是旧时代，最终要使用原生fetchAPI，抛弃axios，不然太重
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true // 需要带入证书信息
})

/**
 * @deprecated
 * @param url
 * @param params
 */
function deprecatedFetch<T extends keyof RequestParams>(
  url: T,
  params?: RequestParams[T]['params']
): Promise<AxiosResponse<RequestParams[T]['response']>> | undefined {
  return axiosInstance.get(url, {
    params: {
      ...params,
      timestamp: (additionalRequestConfigs[url] ?? {}).nocache && Date.now()
    }
  })
}

export default deprecatedFetch
