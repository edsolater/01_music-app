import { ClassValue } from 'classnames/types'
import { MutableRefObject } from 'react'

export const mergeClass = (outer: ClassValue, inner: ClassValue): ClassValue => [outer, inner]

export const mergeCallback = <F extends Callback>(outer: F | undefined, inner: F | undefined): F =>
  ((...args) => {
    outer?.(...args)
    inner?.(...args)
  }) as F

/**
 * 合并refs
 * @param refs 需要合并的refs（
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
