import { useRef, useEffect } from 'react'

/**
 * 返回能记录重渲染次数的ref
 */
function useRenderCounter() {
  const count = useRef(1)
  useEffect(() => {
    count.current += 1
  })
  return count
}
export default useRenderCounter
