import { useRef, useEffect } from 'react'

/**
 * 非纯函数，随机生成ID
 * TODO - 生成的ID要有全局唯一性
 * TODO - 能使用它强行重渲染吗？
 * TODO - 它能记录组件重渲染的原因吗？
 */
function useDevRenderCounter(componentName?: string) {
  const count = useRef(0)
  useEffect(() => {
    count.current += 1
    console.debug(`${componentName} 渲染了 ${count.current} 次`)
  })
}
export default useDevRenderCounter
