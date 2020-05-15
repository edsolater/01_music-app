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

type IRequestFunction = (...anys: any[]) => Promise<AxiosResponse<unknown>>
type getResponseDataShape<T> = T extends () => Promise<AxiosResponse<infer P>> ? P : never

//TODO 这个hook还不能100%地放心食用，因为它假定请求是正常返回的。但如果中断了，并没有考虑。
/**
 * 使用某个请求返回的数据，默认值为空对象
 * @param request 用于发出axios请求的函数
 * @param cb 请求设定成功后的回调
 */
const useResponse: {
  <IRequest extends IRequestFunction>(
    request: IRequest,
    params?: Parameters<IRequest>[0],
    deps?: unknown[],
  ): getResponseDataShape<IRequest>
  // TODO 为了增加灵活性，需要使用 overload
} = (...args) => {
  if (typeof args[0] === 'function') {
    const request = args[0]
    const params = args[1]
    const deps = args[2]
    const [responseData, setResponseData] = useState({} as any)
    const isSetByResponse = useRef(false)
    const prevDeps = useRef<typeof deps>()
    if (!isSetByResponse.current && shallowEqualArray(deps, prevDeps.current)) return responseData
    if (isSetByResponse.current) {
      isSetByResponse.current = false // deps 可能在第二次渲染时，根本不进入这里
    } else {
      request(params).then((res) => {
        isSetByResponse.current = true
        setResponseData(res.data as any)
      })
    }
    return responseData
  }
}
export default useResponse
