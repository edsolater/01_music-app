import { useState } from 'react'

export default function useBoolean(
  /**初始值，默认或不能解析时均为0 */
  init?: unknown,
  /** 值改变时 */
  onChangeCallback?: (newValue: boolean, oldValue: boolean) => any,
) {
  // 使用原生的useState
  const [_booleanState, _setBoolean] = useState(Boolean(init))

  //强化型管理器
  const stateManager = {
    /**自定义本react钩子函数的dispatche */
    set: (newBoolean: boolean | ((oldValue: boolean) => boolean)) => {
      const newValue = typeof newBoolean === 'function' ? newBoolean(_booleanState) : newBoolean
      onChangeCallback?.(newValue, _booleanState)
      _setBoolean(newValue)
    },
    toggle: () => {
      stateManager.set(!_booleanState)
    },
  }
  //返回特化过的（强化版）useState
  return [_booleanState, stateManager] as const
}
