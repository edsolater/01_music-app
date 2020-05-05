import { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'

type IRequestFunction = (...anys: any[]) => Promise<AxiosResponse<unknown>>
type getResponseDataShape<T> = T extends () => Promise<AxiosResponse<infer P>> ? Partial<P> : never

/**
 * 使用某个请求返回的数据，默认值为空对象
 * @param request 用于发出axios请求的函数
 * @param cb 请求设定成功后的回调
 */
const useResponse: {
  <IRequest extends IRequestFunction>(
    request: IRequest,
    params?: Parameters<IRequest>[0],
  ): getResponseDataShape<IRequest>
  // TODO 为了增加灵活性，需要使用 overload
} = (...args) => {
  if (typeof args[0] === 'function') {
    const request = args[0]
    const params = args[1] ?? {}
    const [responseData, setResponseData] = useState({} as any)
    useEffect(() => {
      request(params ?? {}).then((res) => {
        setResponseData(res.data as any)
      })
    }, [])
    return responseData
  }
}
export default useResponse
