import { useState } from 'react'
import { StateBoolean, StateNumber, StateCollectionObject } from 'mypack/class'
import { LastType } from 'mypack/utils/#package_type'

/**
 * 输入初始状态（boolean），返回一个能控制开关状态的对象
 */
const useStateBoolean = (init: boolean) => {
  const [state, setState] = useState(init)
  return new StateBoolean(state, setState)
}

/**
 * 输入初始状态（number），返回一个能控制开关状态的对象
 */
const useStateNumber = (
  init: number,
  config?: LastType<ConstructorParameters<typeof StateNumber>>,
) => {
  const [state, setState] = useState(init)
  return new StateNumber(state, setState, config)
}

/**
 * 输入初始状态（number），返回一个能控制开关状态的对象
 */
const useStateCollectionObject = <O>(
  init: O,
  config?: LastType<ConstructorParameters<typeof StateCollectionObject>>,
) => {
  const [state, setState] = useState(init)
  return new StateCollectionObject<O>(state, setState, config)
}

type Reporters = {
  /**
   * 一般用于记录所选的index
   */
  'index-recorder': ReturnType<typeof useStateNumber>
  /**
   * 用于处理 “开/关” 状态
   */
  'counter': ReturnType<typeof useStateNumber>
  /**
   * 只能0到1之间 //待实现
   * // vscode 没有智能提示
   */
  'counter(percentage)': ReturnType<typeof useStateNumber>
  'on-off-reporter': ReturnType<typeof useStateBoolean>
  'collection(object)': ReturnType<typeof useStateCollectionObject>
}
/**
 * 返回一个 “御主”（Fate世界中的概念，这里意为component的控制者）
 */
const useMaster = <T extends keyof Reporters, O>(config: { type: T; init?: O }): Reporters[T] => {
  // @ts-ignore
  if (config.type === 'index-recorder') return useStateNumber(Number(config.init))
  // @ts-ignore
  if (config.type === 'counter') return useStateNumber(Number(config.init))
  // @ts-ignore
  if (config.type === 'counter(percentage)')
    // @ts-ignore
    return useStateNumber(Number(config.init))
  // @ts-ignore
  if (config.type === 'on-off-reporter') return useStateBoolean(Boolean(config.init))
  // @ts-ignore
  if (config.type === 'collection(object)') return useStateCollectionObject(config.init)
  else throw Error()
}

export default useMaster
