import { useState } from 'react'

export default function useNumberManager(
  /**初始值，默认或不能解析时均为0 */
  init?: unknown,
  /**set时的回调函数 */
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
      console.log('触发了1次')
      _setNumber((oldNumber: number) => {
        const newValue = typeof newNumber === 'function' ? newNumber(oldNumber) : newNumber
        // 使用 onChange 回调
        onChangeCallback?.(newValue, oldNumber)
        console.log('触发了2次') //FIXME：onClick引起了界面的二次渲染，所以react触发了它两次，但第二次渲染时参数相同实际上没有必要
        return newValue
      })
    },
  }
  //返回特化过的（强化版）useState
  return [_numberState, stateManager] as const
}
