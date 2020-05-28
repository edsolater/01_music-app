export function switchState<T extends {}>(param1: T, range: readonly T[]) {
  const index = range.findIndex(i => i === param1)
  const nextIndex = (index + 1) % range.length
  return range[nextIndex]
}
