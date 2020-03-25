import { useState, useMemo } from 'react'
import { StateBoolean, StateNumber, StateStringPath } from 'mypack/class'
import { Path } from 'mypack/class/StateStringPath' // TODO: 要能自动推断出，而不是显示地强行规定

/**
 * 返回一个 “御主”（Fate世界中的概念，这里意为component的控制者）
 */
export default <T extends 'number' | 'boolean' | 'pathStack'>(config: {
  type: T
  init?: T extends 'number'
    ? number
    : T extends 'boolean'
    ? boolean
    : T extends 'pathStack'
    ? Path
    : string
  [configProp: string]: any
}): T extends 'number'
  ? StateNumber
  : T extends 'boolean'
  ? StateBoolean
  : T extends 'pathStack'
  ? StateStringPath
  : void => {
  //记录着这个数据的实际内容
  const [state, setStateFunction] = useState(config.init)
  const result = useMemo(() => {
    switch (config.type) {
      case 'number':
        // @ts-ignore
        return new StateNumber(config, state, setStateFunction)
      case 'boolean':
        // @ts-ignore
        return new StateBoolean(config, state, setStateFunction)
      // FIXME：最后一个阵地要攻克
      case 'pathStack':
        // @ts-ignore
        return new StateStringPath(config, state, setStateFunction)
      default:
        // @ts-ignore
        return null
    }
  }, [])
  return result
}
