import { useState } from 'react'

export default function useNumber(
  /**初始值，默认或不能解析时均为0 */
  init?: unknown,
  /** 值改变回调函数 */
  onChangeCallback?: (newValue: number, oldValue: number) => any,
) {
  // 使用原生的useState
  const [_numberState, _setNumber] = useState(Number(init) || 0)

  //强化型管理器
  const stateManager = {
    /**原来数值的基础上做加减法 */
    add: (deltaNumber: number | ((oldValue: number) => number)) =>
      typeof deltaNumber === 'function'
        ? stateManager.set(deltaNumber)
        : stateManager.set((oldValue: number) => oldValue + deltaNumber),

    /**自定义本react钩子函数的dispatche */
    set: (newNumber: number | ((oldValue: number) => number)) => {
      const newValue = typeof newNumber === 'function' ? newNumber(_numberState) : newNumber
      onChangeCallback?.(newValue, _numberState)
      _setNumber(newValue)
    },
  }
  //返回特化过的（强化版）useState
  return [_numberState, stateManager] as const
}
