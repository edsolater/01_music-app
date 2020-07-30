import { useState, useEffect } from 'react'
type Params = any

let baseUrl = ''
let settedRequestInit: RequestInit = {}
let settedHeader: HeadersInit = {}

function useFetch(url: RequestInfo, init?: RequestInit) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  useEffect(() => {
    fetch(url, {
      ...settedRequestInit,
      ...init,
      headers: { ...settedHeader, ...init?.headers }
    })
      .then(response => {
        if (response.ok) return response.json()
        setError(response)
      })
      .then(data => setData(data))
      .catch(err => {
        console.error(err)
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [init, url])
  return { data, loading, error }
}

/**
 * get 请求
 * 以 '/' 开头说明之前要加上baseUrl
 * @param url
 * @param params
 * @param init
 */
useFetch.get = function (url: RequestInfo, params?: Params, init?: RequestInit) {
  if (typeof url === 'string') {
    url = `${baseUrl + url}?${Object.entries(params)
      .map(pair => pair.join('='))
      .join('&')}`
  }
  return this(url, init)
}

/**
 * TODO： 对紧跟着的请求行为本身进行配置
 * @param config 配置（如：一个请求失败，则全盘失败; 一个请求失败与否都不影响其他请求）
 */
useFetch.configThisFetch = function () {
  return this
}

/**
 * 设置 get 请求的共用地址
 * @param url get请求的地址
 */
useFetch.setBaseUrl = function (url: string) {
  baseUrl = url
  return this
}
/**
 * 为所有请求配置
 * @param init 请求配置（与FetchAPI保持一致）
 */
useFetch.setRequestInit = function (init: RequestInit) {
  settedRequestInit = init
  return this
}

/**
 * 为所有请求添加默认的表头（后来的会覆盖）
 * @param headers 表头详情（与FetchAPI保持一致）
 */
useFetch.setHeader = function (headers: HeadersInit) {
  settedHeader = headers
  return this
}

export default useFetch
