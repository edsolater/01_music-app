import { useRef, useEffect, EffectCallback, DependencyList } from 'react'

/**
 * useEffect 变体，dependList都与前个状态不同时启用
 */
function useLogicAndEffect(effectCallback: EffectCallback, deps?: DependencyList) {
  const lastDeps = useRef<DependencyList>([])
  useEffect(() => {
    if (deps === undefined) {
      effectCallback()
    } else if (deps.every((dep, idx) => dep !== lastDeps[idx])) {
      effectCallback()
      lastDeps.current = deps
    }
  }, deps)
}
export default useLogicAndEffect
