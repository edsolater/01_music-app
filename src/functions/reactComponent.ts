import { MutableRefObject } from 'react'

/**
 * 合并Callbacks
 * @param callbacks 需要合并的Callbacks（数组）
 */
export const mergeCallbacks = (callbacks: (Callback | undefined)[]): Callback => (...args) => {
  callbacks.filter(Boolean).forEach(cb => cb?.(...args))
}

/**
 * 合并refs
 * @param refs 需要合并的refs（数组）
 */
export const mergeRefs = (refs: React.Ref<unknown>[]) => el => {
  refs.filter(Boolean).forEach(ref => {
    if (ref) {
      // 回调式ref
      if (typeof ref === 'function') ref(el)
      // 对象式ref
      else (ref as MutableRefObject<any>).current = el
    }
  })
}
