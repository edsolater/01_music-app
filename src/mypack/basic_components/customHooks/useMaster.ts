import { useState } from 'react'
import { StateBoolean, StateNumber, StateCollectionObject } from 'mypack/class'
import { LastType } from 'mypack/utils/#package_type'

/**
 * 输入初始状态（boolean），返回一个包含布尔值的对象
 */
const useStateBoolean = (init: boolean) => {
  const [state, setState] = useState(init)
  return new StateBoolean(state, setState)
}

class StateString {
  value: string
  private _setStateOfReact: any

  constructor(initValue: string, config?: object) {
    const [state, setState] = useState(initValue)
    this.value = state
    this._setStateOfReact = setState
  }
  changeString(newString: string) {
    this.value = newString
    this._setStateOfReact(newString)
    return this
  }
}

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
const useMaster = <T extends 'number' | 'boolean' | 'string' | 'collection(object)', O>(config: {
  type: T
  init?: O
}): T extends 'number'
  ? StateNumber
  : T extends 'boolean'
  ? ReturnType<typeof useStateBoolean>
  : T extends 'string'
  ? StateString
  : T extends 'collection(object)'
  ? ReturnType<typeof useStateCollectionObject>
  : void => {
  switch (config.type) {
    case 'number':
      // @ts-ignore
      return new StateNumber(Number(config.init), config)
    case 'boolean':
      // @ts-ignore
      return useStateBoolean(Boolean(config.init))
    case 'string':
      // @ts-ignore
      return new StateString(String(config.init))
    case 'collection(object)':
      // @ts-ignore
      return useStateCollectionObject(config.init)
    default:
      // @ts-ignore
      return
  }
}

export default useMaster
