import { useRef } from 'react'

/**
 * 特殊
 *
 * 记录不会引起重渲染
 *
 * @example
 *   const [timeoutId, set] = useRefData(0)
 * @param init 初始值
 * @param onChangeCallback 当值改变
 */
export default function useQueue<T>(
  /**初始值，必填 */
  init: T,
  /** 值改变时 */
  onChangeCallback?: (newValue: T, oldValue: T) => any,
) {
  // 使用原生的useRef
  const stateRef = useRef(init)

  function set(newValue: T) {
    onChangeCallback?.(newValue, stateRef.current)
    stateRef.current = newValue
  }
  //FIXME:这里传输的还是值，而不是地址。因此产生bug
  return [stateRef.current, set] as const
}
