import { useReducer } from 'react'

/**
 * 强制重渲染
 */
export default function useForceRender() {
  const [, forceRender] = useReducer(n => n + 1, 0)
  return {
    trigger() {
      forceRender()
    }
  }
}
