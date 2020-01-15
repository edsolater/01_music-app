import { useState } from 'react'
import { StateBoolean, StateNumber, StateCollectionObject } from 'mypack/class'
import { LastType } from 'mypack/utils/#package_type'
import StateStringPath from 'mypack/class/StateStringPath'

/**
 * 输入初始状态（number），返回一个包含简单对象的对象
 */
const useStateCollectionObject = <O>(
  init: O,
  config?: LastType<ConstructorParameters<typeof StateCollectionObject>>,
) => {
  const [state, setState] = useState(init)
  return new StateCollectionObject<O>(state, setState, config)
}

/**
 * 返回一个 “御主”（Fate世界中的概念，这里意为component的控制者）
 */
const useMaster = <T extends 'number' | 'boolean' | 'stringPath' | 'collection(object)'>(config: {
  type: T
  init?: T extends 'number'
    ? number
    : T extends 'boolean'
    ? boolean
    : T extends 'stringPath'
    ? string
    : object
  [configProp: string]: any
}): T extends 'number'
  ? StateNumber
  : T extends 'boolean'
  ? StateBoolean
  : T extends 'stringPath'
  ? StateStringPath
  : T extends 'collection(object)'
  ? ReturnType<typeof useStateCollectionObject>
  : void => {
  const [state, setState] = useState(config.init)
  console.log('重新渲染了')
  //TOFIX： 这里不应该重新渲染
  switch (config.type) {
    case 'number':
      // @ts-ignore
      return new StateNumber(config, state, setState)
    case 'boolean':
      // @ts-ignore
      return new StateBoolean(config, state, setState)
    case 'stringPath':
      // @ts-ignore
      return new StateStringPath(String(config.init))
    case 'collection(object)':
      // @ts-ignore
      return useStateCollectionObject(config.init)
    default:
      // @ts-ignore
      return
  }
}

export default useMaster
