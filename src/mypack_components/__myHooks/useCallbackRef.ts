import { useState, useCallback } from 'react'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
export const useCallbackRef = <T>(defaultElement: T, callback?: (element:T) => void) => {
  const [element, attachElement] = useState(defaultElement)
  const elementRef = useCallback(node => {
    if (node) {
      if (callback) callback(node)
      attachElement(node)
    }
  }, [])
  return [element, elementRef] as const
}
