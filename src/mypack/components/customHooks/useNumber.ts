import { useState } from 'react'

export default function useNumber(
  /**初始值，默认或不能解析时均为0 */
  init?: unknown,
  /** 值改变回调函数 */
  onChangeCallback?: (newValue: number, oldValue: number) => any,
) {
  // 使用原生的useState
  const [stateNumber, setNumber] = useState(Number(init) || 0)

  //强化型管理器
  const setterManager = {
    /**原来数值的基础上做加减法 */
    add: (deltaNumber: number | ((oldValue: number) => number)) =>
      typeof deltaNumber === 'function'
        ? setterManager.set(deltaNumber)
        : setterManager.set((oldValue: number) => oldValue + deltaNumber),

    /**自定义本react钩子函数的dispatche */
    set: (newNumber: number | ((oldValue: number) => number)) => {
      const newValue = typeof newNumber === 'function' ? newNumber(stateNumber) : newNumber
      onChangeCallback?.(newValue, stateNumber)
      setNumber(newValue)
    },
  }
  //返回特化过的（强化版）useState
  return [stateNumber, setterManager] as const
}
