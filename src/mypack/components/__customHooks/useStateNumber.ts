import { useState} from 'react'
import { StateNumber } from '../../class/StateNumber'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
export const useStateNumber = (init: number) => {
  const [state, setState] = useState(init)
  return new StateNumber(state, setState)
}
