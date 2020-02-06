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
