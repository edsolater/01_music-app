import { useRef, useEffect } from 'react'

/**
 * 返回一个HTMLElemt，callback位于useEffect，且只会渲染一次
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
