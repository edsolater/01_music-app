import { useRef, useEffect } from 'react'

/**
 * useEffect 变体，dependList都与前个状态不同时启用
 */
function useStatedEffect<T extends { [name: string]: any }>(
  effectCallback: (prevDeps: T) => void,
  deps: T
) {
  const prevDeps = useRef<T>({} as any)
  useEffect(() => {
    effectCallback(prevDeps.current)
    prevDeps.current = deps
  }, Object.values(deps))
}
export default useStatedEffect
