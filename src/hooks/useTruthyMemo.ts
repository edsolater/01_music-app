import { useRef, useMemo } from 'react'

/**
 * useEffect 变体，dependList的每一项都与前个状态不同时启用
 */
function useTruthyMemo<T>(effectCallback: () => T, calculateWhen?: boolean): T {
  const renderCounter = useRef(0)
  if (calculateWhen) renderCounter.current += 1
  return useMemo(effectCallback, [renderCounter.current])
}
export default useTruthyMemo
