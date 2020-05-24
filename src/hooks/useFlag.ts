import { useState, useRef } from 'react'

//TODO - 出了有是非旗，还要有数字旗，字符串旗帜和一些特殊用途旗
/**
 * useRef 的封装，用于true/false操作但不引起渲染()
 */
export default function useFlag(init: boolean, options?: { changeWillRerender: boolean }) {
  const [, setRenderInt] = useState(0)
  const flag = useRef(init)
  const result = {
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
  }
  return result
}
