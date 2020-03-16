import { useRef } from 'react'

/**
 * @returns [ref, styleDispatcher]
 * 专用于交互（改变Style）
 */
export default function useDomStyle() {
  const refObject = useRef<HTMLElement>()
  const styleDispatcher = (callback: (style: CSSStyleDeclaration) => any) => {
    if (refObject.current) {
      callback(refObject.current?.style)
    }
  }
  return [refObject, styleDispatcher] as const
}
