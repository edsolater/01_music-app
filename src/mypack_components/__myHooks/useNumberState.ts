import { useState, useDebugValue } from 'react'
import { NumberState } from '../../mypack_class/NumberState'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
export const useNumberState = (init: number) => {
  const [state, setState] = useState(init)
  useDebugValue(`number: ${state}`)
  return new NumberState(state, setState)
}
