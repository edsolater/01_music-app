import { useRef, useEffect } from 'react'

/**
 * 立即返回一个HTMLElemt，不存在元素还未创建值为null的情况
 */
function useDomNode<K extends keyof HTMLElementTagNameMap>(
  elementTag: K,
  callback?: (element: HTMLElementTagNameMap[K]) => void
) {
  const refObject = useRef<HTMLElementTagNameMap[K]>()
  if (!refObject.current) {
    refObject.current = document.createElement(elementTag)
    callback?.(refObject.current)
  }
  return refObject.current
}
export default useDomNode
