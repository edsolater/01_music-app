import { useRef } from 'react'

/**
 * 返回一个HTMLElemt，利用useRef，避免多次计算
 */
export default function useElement<K extends keyof HTMLElementTagNameMap>(
  elementTag: K,
  initCallback?: (element: HTMLElementTagNameMap[K]) => unknown,
) {
  const refObject = useRef<HTMLElementTagNameMap[K]>()
  if (!refObject.current) {
    const element = document.createElement(elementTag)
    initCallback?.(element)
    refObject.current = element
  }
  return refObject.current!
}
