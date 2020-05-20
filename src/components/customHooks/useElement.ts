import { useRef, useMemo } from 'react'
type EventKey<K extends keyof HTMLElementTagNameMap> = Parameters<
  HTMLElementTagNameMap[K]['addEventListener']
>[0]
function foo<T extends 'hello' | 'world'>(a: T, b: 'foo') {
  return 3
}

function useElement<K extends keyof HTMLElementTagNameMap>(
  elementTag: K,
  callback?: (element: HTMLElementTagNameMap[K]) => any,
  listeners?: Parameters<HTMLAudioElement['addEventListener']>, //FIXME -取到的是一个overload形式
): HTMLElementTagNameMap[K]
function useElement<K extends keyof HTMLElementTagNameMap>(
  elementTag: K,
  listeners?: {
    // [eventKey in Parameters<HTMLElementTagNameMap[K]['addEventListener']>[0]]: AnyFunction
    add: AnyFunction
  },
  callback?: (element: HTMLElementTagNameMap[K]) => any,
): HTMLElementTagNameMap[K]
/**
 * 返回一个HTMLElemt，利用useRef，避免每次重渲染都返回不一样的实例
 */
function useElement(elementTag, ...rest) {
  const callback = useMemo(() => rest.find(arg => typeof arg === 'function'), [])
  const listeners = useMemo(() => rest.find(arg => typeof arg == 'object'), [])
  const refObject = useRef()
  if (!refObject.current) {
    const element = document.createElement(elementTag)
    callback?.(element)
    refObject.current = element
    if (listeners) {
      for (const [eventName, eventCallback] of Object.entries(listeners)) {
        //@ts-ignore
        element.addEventListener(eventName, eventCallback)
      }
    }
  }
  return refObject.current!
}
export default useElement
