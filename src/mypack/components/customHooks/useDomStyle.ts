import { useRef, useCallback } from 'react'

/**
 * @returns [ref, styleDispatcher]
 * 专用于交互（改变Style）
 */
export default function useDomStyle_deprecated() {
  const refObject = useRef<HTMLElement>()
  const styleDispatcher = (callback: (style: CSSStyleDeclaration) => any) => {
    if (refObject.current) {
      callback(refObject.current?.style)
    }
  }
  return [refObject, styleDispatcher] as const
}

export function useDomStyle<T extends (...any: any[]) => any>(
  styleCallback: (style: CSSStyleDeclaration) => T,
) {
  //FIXME: 用setState缓存。不然每次刷新都会为空值
  let styleDispatcher: T = (() => {}) as T
  const ref = useCallback(
    () => (el: HTMLElement) => {
      styleDispatcher = styleCallback(el.style)
      console.log(styleDispatcher)
    },
    [],
  )
  return [ref, styleDispatcher] as const
}
