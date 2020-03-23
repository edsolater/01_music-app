import { useRef, useCallback, useState } from 'react'

/**
 * @returns [ref, styleDispatcher]
 * 专用于交互（改变Style）
 */
export default function useDomStyle_deprecated() {
  const refObject = useRef<HTMLElement>()
  const styleDispatcher = (callback: (style: CSSStyleDeclaration) => any) => {
    if (refObject.current) {
      callback(refObject.current.style)
    }
  }
  return [refObject, styleDispatcher] as const
}

export function useDomStyle<T extends (...any: any[]) => any>(
  styleCallback: (style: CSSStyleDeclaration) => T,
) {
  const refObject = useRef<HTMLElement>()
  const styleSetter = ((...args) => {
    if (refObject.current) {
      return styleCallback(refObject.current.style)(...args)
    }
  }) as T
  return [refObject, styleSetter] as const
}
