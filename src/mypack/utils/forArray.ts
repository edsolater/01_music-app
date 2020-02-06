export function isLastIndex(array: unknown[], index: number) {
  return array.length - 1 === index
}
export function isLastItem(array: unknown[], item: unknown) {
  return array[array.length - 1] === item
}
export function isLast(array: unknown[], itemOrIndex: unknown) {
  if (typeof itemOrIndex === 'number') {
    return isLastIndex(array, itemOrIndex)
  } else {
    return isLastItem(array, itemOrIndex)
  }
}
export function isFirstIndex(array/* 为了对称性 */: unknown[], index: number) {
  return 0 === index
}
export function isFirstItem(array: unknown[], item: unknown) {
  return array[0] === item
}
export function isFirst(array: unknown[], itemOrIndex: unknown) {
  if (typeof itemOrIndex === 'number') {
    return isFirstIndex(array, itemOrIndex)
  } else {
    return isFirstItem(array, itemOrIndex)
  }
}
