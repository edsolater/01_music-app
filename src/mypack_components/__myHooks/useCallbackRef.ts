import { useState, useCallback  } from 'react'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
export const useCallbackRef = (defaultElement) => {
  const [element, attachElement] = useState(defaultElement)
  const elementRef = useCallback(node=> {
    if (node){
      attachElement(node)
    }
  },[])
  return [element, elementRef]
}
