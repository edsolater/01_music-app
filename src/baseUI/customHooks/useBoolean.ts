import { useState } from 'react'

export default function useBoolean(
  /**初始值，默认或不能解析均为false */
  init?: unknown,
  /** 值改变时 */
  onChangeCallback?: (newValue: boolean, oldValue: boolean) => any
) {
  // 使用原生的useState
  const [state, set] = useState(Boolean(init))

  //强化型管理器
  const setters = {
    /**自定义本react钩子函数的dispatche */
    set(newBoolean: boolean | ((oldValue: boolean) => boolean)) {
      const newValue = typeof newBoolean === 'function' ? newBoolean(state) : newBoolean
      onChangeCallback?.(newValue, state)
      set(newValue)
    },
    toggle() {
      setters.set(!state)
    },
    on() {
      if (state !== true) setters.set(true)
    },
    off() {
      if (state !== false) setters.set(false)
    }
  }
  //返回特化过的（强化版）useState
  return [state, setters] as const
}
