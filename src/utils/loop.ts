export function loop<T extends {}>(current: T, range: readonly T[]) {
  const index = range.findIndex(i => i === current)
  if (index === -1) return current
  const nextIndex = (index + 1) % range.length
  return range[nextIndex]
}
export function loopBackward<T extends {}>(current: T, range: readonly T[]) {
  const index = range.findIndex(i => i === current)
  if (index === -1) return current
  const nextIndex = (index + range.length - 1) % range.length
  return range[nextIndex]
}
