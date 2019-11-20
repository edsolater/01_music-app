import { useState } from 'react'
import { StateBoolean } from '../../class/StateBoolean'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
export const useStateBoolean = (init: boolean) => {
  const [state, setState] = useState(init)
  return new StateBoolean(state, setState)
}
