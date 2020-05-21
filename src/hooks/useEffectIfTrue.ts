import { useEffect } from 'react'

// 其与 useEffect 有相同的签名，但只在deps每一项为true时产生回调
function useEffectIfTrue(
  effect: Parameters<typeof useEffect>[0],
  deps?: Parameters<typeof useEffect>[1],
) {
  useEffect(() => {
    if (deps && deps.every(Boolean)) {
      effect()
    } else {
      effect()
    }
  }, deps)
}
export default useEffectIfTrue
