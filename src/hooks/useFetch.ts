import { useState, useEffect } from 'react'
import { getQueryString } from 'utils/string'
type Params = any

let baseUrl = ''
let settedRequestInit: RequestInit = {}
let settedHeader: HeadersInit = {}

function useFetch<R>(url: RequestInfo, init?: RequestInit) {
  const [data, setData] = useState<R | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>()
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
 * 注意：这是react hook
 * 获取资源
 * @param url 以 '/' 开头说明之前要加上baseUrl
 * @param params
 * @param init
 */
export function useResource<R>(url: RequestInfo, params?: Params, init?: RequestInit) {
  url = `${(typeof url === 'string' ? baseUrl : '') + url}?${getQueryString(params)}`
  const [res, setData] = useState<R | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>()
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
  return { res, loading, error }
}

/**
 * 为所有请求设置基本配置
 */
export function setDefaultResourceInfo(info: {
  baseUrl?: string
  headers?: HeadersInit
  requestInit?: RequestInit
}) {
  if (info.baseUrl) baseUrl = info.baseUrl
  if (info.requestInit) settedRequestInit = info.requestInit
  if (info.headers) settedHeader = info.headers
}

/**
 * 使用基本配置的fetch
 * @param url
 * @param params
 * @param init
 */
export function myFetch<R>(url: RequestInfo, params?: Params, init?: RequestInit): Promise<R> {
  url = `${(typeof url === 'string' ? baseUrl : '') + url}?${getQueryString(params)}`
  return fetch(url, {
    ...settedRequestInit,
    ...init,
    headers: { ...settedHeader, ...init?.headers }
  })
    .then(response => {
      if (response.ok) return response.json()
    })
    .catch(err => {
      console.error(err)
    })
}

export default useFetch
