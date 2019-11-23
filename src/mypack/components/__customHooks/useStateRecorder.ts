import { useState} from 'react'
import { StateBoolean } from '../../class'
import { StateNumber } from '../../class'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
const useStateBoolean = (init: boolean) => {
  const [state, setState] = useState(init)
  return new StateBoolean(state, setState)
}


/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
const useStateNumber = (init: number) => {
  const [state, setState] = useState(init)
  return new StateNumber(state, setState)
}


type StateReporters = {
  'counter': ReturnType<typeof useStateNumber>
  /**
   * 只能0到1之间 //待实现
   * // vscode 没有智能提示
   */
  'counter(percentage)': ReturnType<typeof useStateNumber>
  'on-off-reporter': ReturnType<typeof useStateBoolean>
}
/**
 * 返回一个 “状态监工”， 它反应着component的状态
 */
const useStateRecorder = <T extends keyof StateReporters>(config: {
  type: T
  init?: any
}): StateReporters[T] => {
  // @ts-ignore
  if (config.type === 'counter') return useStateNumber(Number(config.init))
  // @ts-ignore
  if (config.type === 'counter(percentage)') return useStateNumber(Number(config.init))
  // @ts-ignore
  if (config.type === 'on-off-reporter') return useStateBoolean(Boolean(config.init))
  else throw Error()
}

export default useStateRecorder