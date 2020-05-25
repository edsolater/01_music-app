import { AxiosResponse } from 'axios'
import { useState, useRef } from 'react'

const shallowEqualArray = (arr1?: unknown[], arr2?: unknown[]) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false
  if (arr1.length !== arr2.length) return false
  for (let idx = 0; idx < arr1.length; idx++) {
    if (arr1[idx] !== arr2[idx]) return false
  }
  return true
}

type RequestFunction = (...anys: any[]) => Promise<AxiosResponse<unknown>>
type ResponseData<T> = T extends () => Promise<AxiosResponse<infer P>> ? P : never

//TODO 这个hook还不能100%地放心食用，因为它假定请求是正常返回的。但如果中断了，并没有考虑。
/**
 * 使用某个请求返回的数据，默认值为空对象
 * @param request 用于发出axios请求的函数
 */
const useRequest: {
  <T extends RequestFunction>(request: T, deps?: unknown[]): ResponseData<T>
  <T extends RequestFunction>(
    request: T,
    options?: {
      params?: Parameters<T>[0]
      deps?: unknown[]
      callback?: Callback
    }
  ): ResponseData<T>
} = (...args) => {
  const request = args[0]
  const params = args[1]?.params
  const deps = args[1]?.deps ?? args[1]
  const callback = args[1]?.callback

  const [responseData, setResponseData] = useState({} as any)
  const isSetByResponse = useRef(false) // 指示当前渲染是否是由上一次的请求引起的，如果是，就不再setData。存在时为了阻断无限请求
  const prevDeps = useRef<typeof deps>(undefined)
  if (isSetByResponse.current) {
    //是由上次请求导致的重渲染，无需再进入到请求
    isSetByResponse.current = false
  } else {
    if (!shallowEqualArray(deps, prevDeps.current)) {
      request(params)
        .then(res => {
          isSetByResponse.current = true // 设定为true，下一次重渲染就不会再进入到请求了
          prevDeps.current = deps
          setResponseData(res.data as any)
          return res.data
        })
        .then(data => callback?.(data))
    }
  }
  return responseData
}
export default useRequest
