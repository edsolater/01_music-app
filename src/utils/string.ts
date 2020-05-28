export function switchState<T extends string>(currentState: T, range: readonly T[]): T
export function switchState<T extends string>(currentState: number, range: readonly T[]): T
export function switchState<T extends string>(param1: T | number, range: readonly T[]) {
  let index = 0
  if (typeof param1 === 'number') {
    index = param1
  } else {
    index = range.findIndex(i => i === param1)
  }
  const nextIndex = (index + 1) % range.length
  return range[nextIndex]
}
