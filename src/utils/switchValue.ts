import { assert } from './judger'

function switchValue(param1: boolean): boolean
function switchValue<T extends {}>(param1: T, range: readonly T[]): T
function switchValue<T extends {}>(param1: T, range?: readonly T[]) {
  if (typeof param1 === 'boolean') {
    return !param1
  } else {
    assert(range)
    const index = range.findIndex(i => i === param1)
    const nextIndex = (index + 1) % range.length
    return range[nextIndex]
  }
}

export default switchValue
