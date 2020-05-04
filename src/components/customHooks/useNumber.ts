import { useState } from 'react'

/**
 * 数据hooks
 * 储存数字
 * @example
 *   const [num, numManager] = useNumber(0)
 * @param init 初始值
 * @param onChangeCallback 当值改变
 */
export default function useNumber(
  /**初始值，默认或不能解析时均为NaN */
  init?: unknown,
  /** 值改变时 */
  onChangeCallback?: (newValue: number, oldValue: number) => any,
) {
  // 使用原生的useState
  const [state, set] = useState(Number(init))

  //强化型管理器
  const setters = {
    /**原来数值的基础上做加减法 */
    add: (deltaNumber: number | ((oldValue: number) => number)) =>
      typeof deltaNumber === 'function'
        ? setters.set(deltaNumber)
        : setters.set((oldValue: number) => oldValue + deltaNumber),

    set: (newNumber: number | ((oldValue: number) => number)) => {
      const newValue = typeof newNumber === 'function' ? newNumber(state) : newNumber
      onChangeCallback?.(newValue, state)
      set(newValue)
    },
  }
  //返回特化过的（强化版）useState
  return [state, setters] as const
}
