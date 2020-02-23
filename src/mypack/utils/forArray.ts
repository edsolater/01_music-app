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
export const createArray = (config: { repeating?: unknown; count?: number } = {}) =>
  Array(config.count).fill(config.repeating)
export const createRange = (
  config: { min?: number; max?: number; count?: number; includeEnd?: boolean } = {},
) => {
  const min = config.min ?? (config.max ?? 10) - (config.count ?? 10)
  const max = config.max ?? min + (config.count ?? 10)
  return Array.from({ length: max - min + (config.includeEnd ? 1 : 0) }, (_, i) => i + min)
}

export const removeItem = <T>(array: T[], item: T) => array.splice(array.indexOf(item), 1)
export const removeAllItems = <T>(array: T[]) => array.splice(0, array.length)

