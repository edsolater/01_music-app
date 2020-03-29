import { useState } from 'react'

/**
 * 数据结构 (队列Queue)
 *
 * 可用于记录路径
 *
 * @example
 *   const [path, pathSetter] = useItemQueue(['parent', 'child'])
 * @param init 初始值
 * @param onChangeCallback 当值改变
 */
export default function useQueue<T extends unknown[]>(
  /**初始值，默认为 [] */
  init?: T,
  /** 值改变时 */
  onChangeCallback?: (newValue: T, oldValue: T) => any,
) {
  // 使用原生的useState
  const [state, set] = useState(init ?? (([] as unknown) as T))

  //强化型管理器
  const setters = {
    set: (userNewValue: T | ((oldValue: T) => T)) => {
      const parsedNewValue = typeof userNewValue === 'function' ? userNewValue(state) : userNewValue
      onChangeCallback?.(parsedNewValue, state)
      set(parsedNewValue)
    },
  }
  //返回特化过的（强化版）useState
  return [state, setters] as const
}
