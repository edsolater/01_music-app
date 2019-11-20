import { useState, useDebugValue } from 'react'
import { BooleanState } from '../../class/BooleanState'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
export const useBooleanState = (init: boolean) => {
  const [state, setState] = useState(init)
  useDebugValue(state ? 'on' : 'off')
  return new BooleanState(state, setState)
}
