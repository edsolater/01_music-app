import { useRef, useMemo, useState } from 'react'

/********************************************
 * useRef 的封装，用于true/false操作但不引起渲染()
 ********************************************/
function useFlag(init: boolean, options?: { changeWillRerender: boolean }) {
  const [, setRenderInt] = useState(0)
  const flag = useRef(init)
  const result = useMemo(
    () => ({
      get current() {
        return flag.current
      },
      truify() {
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
export default useFlag
