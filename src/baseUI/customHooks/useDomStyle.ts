import { useRef } from 'react'

/**
 * @returns [ref, styleDispatcher]
 * 专用于交互（改变Style）
 */
export default function useDomStyle<T extends (...any: any[]) => any>(
  styleCallback: (style: CSSStyleDeclaration) => T
) {
  const refObject = useRef<HTMLElement>()
  const styleSetter = ((...args) => {
    if (refObject.current) {
      return styleCallback(refObject.current.style)(...args)
    }
  }) as T
  return [refObject, styleSetter] as const
}
