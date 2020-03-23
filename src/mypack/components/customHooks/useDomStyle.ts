import { useRef, useCallback, useState } from 'react'

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
  const [styleDispatcher, setDispatcher] = useState<T>(() => (() => {}) as T)
  const ref = useCallback((el: HTMLElement) => {
    setDispatcher(() => styleCallback(el.style))
  }, [])
  return [ref, styleDispatcher] as const
}
