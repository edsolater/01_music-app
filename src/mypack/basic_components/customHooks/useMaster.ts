import { useState, useMemo } from 'react'
import { StateBoolean, StateNumber, StateStringPath } from 'mypack/class'

/**
 * 返回一个 “御主”（Fate世界中的概念，这里意为component的控制者）
 */
export default <T extends 'number' | 'boolean' | 'stringPath'>(config: {
  type: T
  init?: T extends 'number'
    ? number
    : T extends 'boolean'
    ? boolean
    : T extends 'stringPath'
    ? string
    : string
  [configProp: string]: any
}): T extends 'number'
  ? StateNumber
  : T extends 'boolean'
  ? StateBoolean
  : T extends 'stringPath'
  ? StateStringPath
  : void => {
  //记录着这个数据的实际内容
  const [state, setState] = useState(config.init)
  const result = useMemo(() => {
    switch (config.type) {
      case 'number':
        // @ts-ignore
        return new StateNumber(config, state, setState)
      case 'boolean':
        // @ts-ignore
        return new StateBoolean(config, state, setState)
      case 'stringPath':
        // @ts-ignore
        return new StateStringPath(config, state, setState)
      default:
        // @ts-ignore
        return null
    }
  }, [])
  return result
}
