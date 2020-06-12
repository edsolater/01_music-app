import { useRef, useEffect, EffectCallback, DependencyList } from 'react'

/**
 * useEffect 变体，dependList的每一项都与前个状态不同时启用
 */
function useAndEffect(effectCallback: EffectCallback, deps: DependencyList) {
  const prevDeps = useRef<DependencyList>([])
  useEffect(() => {
    if (prevDeps.current.every((prev, idx) => prev !== deps[idx])) {
      effectCallback()
      prevDeps.current = deps
    }
  }, deps)
}
export default useAndEffect
