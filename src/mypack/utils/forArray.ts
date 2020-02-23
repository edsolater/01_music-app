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

//
//
// —————————————— 创建数组 ——————————————
//
export const createArray = (config: { repeating?: unknown; count?: number } = {}) =>
  Array(config.count).fill(config.repeating)
export const createRange = (
  config: { min?: number; max?: number; count?: number; includeEnd?: boolean } = {},
) => {
  const min = config.min ?? (config.max ?? 10) - (config.count ?? 10)
  const max = config.max ?? min + (config.count ?? 10)
  return Array.from({ length: max - min + (config.includeEnd ? 1 : 0) }, (_, i) => i + min)
}

//
//
// —————————————— 数组操作 ——————————————
//
export const removeItem = <T>(array: T[], item: T) => array.splice(array.indexOf(item), 1)
export const removeAllItems = <T>(array: T[]) => array.splice(0, array.length)

//
//
// —————————————— 使用数组的集合算法 ——————————————
//
//把相交的两个集合数组，分成三个部分
const _splitArrayParts = <T, U>(arrA: T[], arrB: U[]) => {
  const partA: (U | T)[] = []
  const partAB: (U | T)[] = []
  const partB: (U | T)[] = []
  for (const item of [...new Set(arrA.concat(arrB as any[]))] as (T | U)[]) {
    const inA = arrA.includes(item as any)
    const inB = arrB.includes(item as any)
    if (inA && inB) partAB.push(item)
    else if (inA) partA.push(item)
    else if (inB) partB.push(item)
  }
  return [partA, partAB, partB] as const
}

//交集、差集、并集（集合加法）、集合减法
export const intersectWidth = <T, U>(arrA: T[], arrB: U[]) => {
  const [, partAB] = _splitArrayParts(arrA, arrB)
  return partAB
}
export const exclusiveOrWidth = <T, U>(arrA: T[], arrB: U[]) => {
  const [partA, , partB] = _splitArrayParts(arrA, arrB)
  return partA.concat(partB)
}
export const unionWidth = <T, U>(arrA: T[], arrB: U[]) => {
  const [partA, partAB, partB] = _splitArrayParts(arrA, arrB)
  return partA.concat(partAB).concat(partB)
}
export const substractWidth = <T, U>(arrA: T[], arrB: U[]) => {
  const [partA] = _splitArrayParts(arrA, arrB)
  return partA
}

//
//
// —————————————— 判断两个数组关系 ——————————————
//
// 判断A与B相交
export const isIntersetWith = (arrA: unknown[], arrB: unknown[]) =>
  arrB.some(itemB => arrA.includes(itemB as any))
// 判断A与B毫不相干
export const isDisjointWith = (arrA: unknown[], arrB: unknown[]) =>
  arrB.every(itemB => !arrA.includes(itemB as any))
// 判断A是B的超集
export const isSupersetOf = (arrA: unknown[], arrB: unknown[]) =>
  arrB.every(itemB => arrA.includes(itemB as any))
// 判断A是B的子集
export const isSubsetOf = (arrA: unknown[], arrB: unknown[]) =>
  arrA.every(itemA => arrB.includes(itemA as any))
// 判断内容相等
export const isEqualWith = (arrA: unknown[], arrB: unknown[]) =>
  arrA.length === arrB.length && arrA.every((itemA, idx) => itemA === arrB[idx])

//
//
// ———————————— 定义包装类 ——————————————
//
class _UArray {
  constructor(private arr: unknown[]) {}
  isFirstIndex = isFirstIndex.bind(this, this.arr)
  isFirstItem = isFirstItem.bind(this, this.arr)
  isLastIndex = isLastIndex.bind(this, this.arr)
  isLastItem = isLastItem.bind(this, this.arr)
  isEmpty = isEmpty.bind(this, this.arr)

  intersectWidth = intersectWidth.bind(this, this.arr)
  exclusiveOrWidth = exclusiveOrWidth.bind(this, this.arr)
  unionWidth = unionWidth.bind(this, this.arr)
  substractWidth = substractWidth.bind(this, this.arr)

  isIntersetWith = isIntersetWith.bind(this, this.arr)
  isDisjointWith = isDisjointWith.bind(this, this.arr)
  isSupersetOf = isSupersetOf.bind(this, this.arr)
  isSubsetOf = isSubsetOf.bind(this, this.arr)
  isEqualWith = isEqualWith.bind(this, this.arr)
}
export function UArray(arr: unknown[]) {
  return new _UArray(arr)
}
UArray.isFirstIndex = isFirstIndex
UArray.isFirstItem = isFirstItem
UArray.isLastIndex = isLastIndex
UArray.isLastItem = isLastItem
UArray.isEmpty = isEmpty

UArray.intersectWidth = intersectWidth
UArray.exclusiveOrWidth = exclusiveOrWidth
UArray.unionWidth = unionWidth
UArray.substractWidth = substractWidth

UArray.isIntersetWith = isIntersetWith
UArray.isDisjointWith = isDisjointWith
UArray.isSupersetOf = isSupersetOf
UArray.isSubsetOf = isSubsetOf
UArray.isEqualWith = isEqualWith

//
//
// ———————————— test ——————————————
//
console.log(isIntersetWith([2, 4], [2, 4, 1, 3]))
console.log(UArray.isIntersetWith([27], [2, 4, 1, 3]))
console.log(UArray([2, 4, 5]).isEqualWith([2, 4, 5]))
