import { useRef, useEffect } from 'react'

/**
 * 返回一个HTMLElemt，利用useRef，避免每次重渲染都返回不一样的实例
 */
// FIXME - 还没有支持传入reactNode呢
function useElement<K extends keyof HTMLElementTagNameMap>(
  elementTag: K,
  callback?: (element: HTMLElementTagNameMap[K]) => void
) {
  const refObject = useRef<HTMLElementTagNameMap[K]>()
  if (!refObject.current) {
    const element = document.createElement(elementTag)
    refObject.current = element
  }
  useEffect(() => {
    if (refObject.current) callback?.(refObject.current)
  })
  return refObject.current
}
export default useElement
