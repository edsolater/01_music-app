import { AxiosResponse } from 'axios'
import { useState, useEffect, useRef, DependencyList } from 'react'

type IRequestFunction = (...anys: any[]) => Promise<AxiosResponse<unknown>>
type getResponseDataShape<T> = T extends () => Promise<AxiosResponse<infer P>> ? P : never
export type deRequestReturnType<T> = getResponseDataShape<T>

//TODO useResponse 本身要能实现cache，且要能自定义cache的规则，避免无意义的多次请求
/**
 * 使用某个请求返回的数据，默认值为空对象
 * @param request 用于发出axios请求的函数
 * @param cb 请求设定成功后的回调
 */
const useResponse: {
  <IRequest extends IRequestFunction>(
    request: IRequest,
    params?: Parameters<IRequest>[0],
    deps?: DependencyList,
  ): getResponseDataShape<IRequest>
  // TODO 为了增加灵活性，需要使用 overload
} = (...args) => {
  if (typeof args[0] === 'function') {
    const request = args[0]
    const params = args[1] ?? {}
    const deps = args[2]
    const [responseData, setResponseData] = useState({} as any)
    const renderByResponse = useRef(false)
    useEffect(() => {
      if (renderByResponse.current) {
        renderByResponse.current = false
      } else {
        request(params).then((res) => {
          renderByResponse.current = true
          setResponseData(res.data as any)
        })
      }
    }, deps)
    return responseData
  }
}
export default useResponse
