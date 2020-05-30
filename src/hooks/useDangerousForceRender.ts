import { useReducer } from 'react'

/**
 * 强制重渲染 (尽量不使用)
 * 如果副作用更新了状态，那么就应该自动刷新次组件，而不是强制刷新
 */
export default function useDangerousForceRender() {
  const [, forceRender] = useReducer(n => n + 1, 0)
  return {
    trigger() {
      forceRender()
    }
  }
}
