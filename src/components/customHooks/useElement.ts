import { useRef, useMemo } from 'react'

type GetAddEventListenerParameter<
  T extends keyof HTMLElementTagNameMap
> = HTMLElementTagNameMap[T]['addEventListener'] extends {
  (...rest: infer P): any
  (...rest: any): any
}
  ? P
  : never

function useElement<K extends keyof HTMLElementTagNameMap>(
  elementTag: K,
  callback?: (element: HTMLElementTagNameMap[K]) => any,
  listeners?: {
    //@ts-ignore 原因：有unknown，引起飘红，忽视即可
    [EventKey in GetAddEventListenerParameter<K>[0]]?: (
      this: HTMLElementTagNameMap[K],
      //@ts-ignore
      ev: HTMLElementEventMap[EventKey],
      el: HTMLElementTagNameMap[K],
    ) => any
  },
): HTMLElementTagNameMap[K]

function useElement<K extends keyof HTMLElementTagNameMap>(
  elementTag: K,
  listeners?: {
    //@ts-ignore 原因：有unknown，引起飘红，忽视即可
    [EventKey in GetAddEventListenerParameter<K>[0]]?: (
      this: HTMLElementTagNameMap[K],
      //@ts-ignore
      ev: HTMLElementEventMap[EventKey],
      el: HTMLElementTagNameMap[K],
    ) => any
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
