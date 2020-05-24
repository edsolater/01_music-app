import { EffectCallback, useEffect, DependencyList, useState, useRef, useMemo } from 'react'

/**
 * useRef 的封装，用于true/false操作但不引起渲染()
 */
function useFlag(init: boolean, options?: { changeWillRerender: boolean }) {
  const [, setRenderInt] = useState(0)
  const flag = useRef(init)
  const result = useMemo(
    () => ({
      get current() {
        return flag.current
      },
      trigger() {
        flag.current = true
        if (options?.changeWillRerender) setRenderInt(n => n + 1)
      },
      falsfy() {
        flag.current = false
        if (options?.changeWillRerender) setRenderInt(n => n + 1)
      }
    }),
    []
  )
  return result
}

/**
 * 只有deps是true时，
 */
function useEffectWhenTrue(effect: EffectCallback, deps?: DependencyList) {
  useEffect(() => {
    if (!deps || deps.every(Boolean)) {
      effect()
    }
  }, deps)
}

/**
 * 组合，返回控制是否触发回调的控制器
 */
export default function useEffectTrigger(
  callback: EffectCallback
): { readonly current: boolean; trigger(): void } {
  const flag = useFlag(false)
  useEffectWhenTrue(() => {
    callback()
    flag.falsfy()
  }, [flag.current])
  return flag
}
