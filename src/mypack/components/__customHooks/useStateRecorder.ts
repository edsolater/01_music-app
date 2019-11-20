import { StateBoolean } from 'mypack/class'
import { useStateNumber } from './useStateNumber'
import { useStateBoolean } from './useStateBoolean'

type StateReporters = {
  'counter': ReturnType<typeof useStateNumber>
  /**
   * 只能0到1之间 //待实现
   * // vscode 没有智能提示
   */
  'counter(percentage)': ReturnType<typeof useStateNumber>
  'on-off-reporter': StateBoolean
}
/**
 * 返回一个 “状态监工”， 它反应着component的状态
 */
export const useStateRecorder = <T extends keyof StateReporters>(config: {
  type: T
  init?: any
}): StateReporters[T] => {
  // @ts-ignore
  if (config.type === 'counter') return useStateNumber(Number(config.init))
  // @ts-ignore
  if (config.type === 'counter(percentage)') return useStateNumber(Number(config.init))
  // @ts-ignore
  if (config.type === 'on-off-reporter') return useStateBoolean(Boolean(config.init))
  else {
    throw Error()
  }
}
