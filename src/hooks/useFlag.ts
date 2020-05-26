import { useState, useRef } from 'react'

//TODO - 出了有是非旗，还要有数字旗，字符串旗帜和一些特殊用途旗
/**
 * useRef 的封装，用于true/false操作但不引起渲染()
 */
export default function useFlag(
  init = false,
  options?: {
    changeWillRerender: boolean
    readTime: number /* 可读取current的次数，超过次数，自动变为false */
  }
) {
  const [, setRenderInt] = useState(0)
  const flag = useRef(init)
  const restReadTime = useRef(options?.readTime ?? 1)
  const result = {
    get current() {
      const resultAtThatTime = flag.current
      if ((restReadTime.current -= 1) === 0) {
        flag.current = false
        restReadTime.current = options?.readTime ?? 1
      }
      return resultAtThatTime
    },
    trigger() {
      flag.current = true
      if (options?.changeWillRerender) setRenderInt(n => n + 1)
    }
  }
  return result
}
