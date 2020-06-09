import { useRef, useEffect } from 'react'

/**
 * 立即返回一个HTMLElemt，不存在元素还未创建值为null的情况
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
  }, [])
  return refObject.current
}
export default useElement
