import { ClassValue } from 'classnames/types'

export const mergeClass = (outer: ClassValue, inner: ClassValue): ClassValue => [outer, inner]

export const mergeCallback = <F extends Callback>(outer: F | undefined, inner: F | undefined): F =>
  ((...args) => {
    outer?.(...args)
    inner?.(...args)
  }) as F
