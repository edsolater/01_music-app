import { MutableRefObject } from 'react'

/**
 * 合并Callbacks
 * @param callbacks 需要合并的Callbacks（数组或...rest）
 */
export function mergeCallbacks(...callbacks: MayArrayInArray<Callback | undefined>): Callback {
  const _callbacks = callbacks.flat().filter(Boolean)
  return function mergedCallback(...args) {
    _callbacks.filter(Boolean).forEach(cb => cb?.(...args))
  }
}

/**
 * 合并refs
 * @param refs 需要合并的refs（数组或...rest）
 */
export function mergeRefs(
  ...refs: MayArrayInArray<React.Ref<any | undefined>>
): React.RefCallback<any> {
  const _refs = refs.flat().filter(Boolean)
  return function mergedRef(el) {
    _refs.forEach(ref => {
      if (ref) {
        // 回调式ref
        if (typeof ref === 'function') ref(el)
        // 对象式ref
        else (ref as MutableRefObject<any>).current = el
      }
    })
  }
}

// TODO 合并2个props对象
//  mergeProps
