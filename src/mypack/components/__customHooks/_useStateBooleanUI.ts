import { useState } from 'react'
import { StateBooleanUI } from 'mypack/class'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
export const useStateBooleanUI = (init: boolean) => {
  const [state, setState] = useState(init)
  return new StateBooleanUI(state, setState)
}
