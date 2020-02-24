//
//
// —————————————— 判断元素处于的数组位置 ——————————————
//
export const isLastIndex = (array: unknown[], index: number) => array.length - 1 === index
export const isLastItem = (array: unknown[], item: unknown) => array[array.length - 1] === item
export const isFirstIndex = (array: /* 为了对称性 */ unknown[], index: number) => 0 === index
export const isFirstItem = (array: unknown[], item: unknown) => array[0] === item
export const isLast = (array: unknown[], itemOrIndex: unknown) => {
  if (typeof itemOrIndex === 'number') {
    return isLastIndex(array, itemOrIndex)
  } else {
    return isLastItem(array, itemOrIndex)
  }
}
export const isFirst = (array: unknown[], itemOrIndex: unknown) => {
  if (typeof itemOrIndex === 'number') {
    return isFirstIndex(array, itemOrIndex)
  } else {
    return isFirstItem(array, itemOrIndex)
  }
}
export const isEmpty = (array: unknown[]) => array.length === 0
