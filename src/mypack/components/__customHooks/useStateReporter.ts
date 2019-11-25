import { useState } from 'react'
import { StateBoolean } from '../../class'
import { StateNumber } from '../../class'
import { LastType } from '../../utils/#package_type'

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
const useStateNumber = (
  init: number,
  config: LastType<ConstructorParameters<typeof StateNumber>>,
) => {
  const [state, setState] = useState(init)
  return new StateNumber(state, setState, config)
}

type Reporters = {
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
const useStateReporter = <T extends keyof Reporters>(config: { type: T; init?: any }): Reporters[T] => {
  // @ts-ignore
  if (config.type === 'counter') return useStateNumber(Number(config.init))
  // @ts-ignore
  if (config.type === 'counter(percentage)')
    // @ts-ignore
    return useStateNumber(Number(config.init))
  // @ts-ignore
  if (config.type === 'on-off-reporter') return useStateBoolean(Boolean(config.init))
  else throw Error()
}

export default useStateReporter
