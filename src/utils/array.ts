//@ts-nocheck

/**
 * (immutable)在数组的每两项间的空隙，插入值
 * @param target 目标数组
 * @param toInsert 中间插入的值
 * @example
 * fillArrayGap(['hello','world','!'],1) => ['hello', 1, 'world', 1, '!']
 */
export function fillGap<T, K>(target: T[], toInsert: K): (T | K)[] {
  const copyed: (T | K)[] = []
  for (let i = 0; i < target.length - 1; i++) {
    copyed.push(target[i], toInsert)
  }
  copyed.pop()
  return copyed
}

/**
 * (immutable)新创建一个有初始长度的数组，默认空值为undefined
 * @param length 数组长度
 * @param fill 空位置上的值，默认undefined
 * @example
 * createArray(3) => [undefined, undefined, undefined]
 * createArray(3, 'ha') => ['ha', 'ha', 'ha']
 * createArray(3, i => i) => [0, 1, 2]
 */
export function createArray<T>(length: number, fill?: T | ((idx: number) => T)): T[] {
  if (typeof fill === 'function') {
    return Array.from({ length }, (_, i) => fill(i))
  } else {
    return Array.from({ length }, () => fill)
  }
}

/**
 * (mutable)随机打乱数组（Fisher–Yates算法）
 * @param arr 目标数组
 * @example
 * shuffle([1,2,3,4,5]) => [4,3,5,1,2]
 * @see https://juejin.im/post/5d004ad95188257c6b518056#heading-4
 */
export function shuffle<T>(arr: T[]): T[] {
  let m = arr.length
  while (m > 1) {
    let index = Math.floor(Math.random() * m--)
    ;[arr[m], arr[index]] = [arr[index], arr[m]]
  }
  return arr
}

// IDEA 批处理，类似 listDo(target, action1, action2) => newList

/**
 * 获取数组的某个值，
 * 与 arr[index] 不同的是， offset是偏移量，会根据数组的长度计算出来
 * @template T
 * @param {T[]} arr 原数组
 * @param {number} offset 偏移量下标
 * @returns {T}
 */
export const getArrayItem = (arr, offset) => arr[((offset % arr.length) + arr.length) % arr.length]

/**
 * *纯函数* **pure function**
 *
 * 统计各元素在数组中出现的次数，返回一个代表统计的Map
 * @param arr 原数组
 */
export const countAppearance = <T>(arr: T[]): Map<T, number> => {
  const map = new Map()
  for (const n of arr) {
    map.set(n, (map.get(n) || 0) + 1)
  }
  return map
}

/**
 * **pure**
 * 同时获取最大元素与最小值元素， 如果需要可以获取两者的索引
 * @param arr 组数
 * @param mapFn 映射为数字（如果必要的话）
 * @example
 * parseMinAndMax([1,2,3]) // { max:3, min:1, maxIndex:2, minIndex:0 }
 * parseMinAndMax(['a','b','c'], char=>char.charCodeAt(0)) // { max:'c', min:'a', maxIndex:2, minIndex:0 }
 */
export const parseMinAndMax = <T>(
  arr: T[],
  mapFn?: (item: T) => number
): { max: T; min: T; maxIndex: number; minIndex: number } => {
  const list = arr.map(mapFn ? mapFn : i => Number(i))
  let maxIndex = 0
  let minIndex = 0
  for (let i = 0; i < list.length; i++) {
    if (list[i] > list[maxIndex]) maxIndex = i
    if (list[i] < list[maxIndex]) minIndex = i
  }
  return { max: arr[maxIndex], min: arr[minIndex], maxIndex, minIndex }
}

/**
 * **mutate**
 * 按数字大小排序数组
 * @param arr 需要排序的数组
 * @param options 排序选择
 */
export const sortArray = <T>(
  arr: T[],
  options: { mapFn: (a: T, b: T) => number; direction: 'descending' | 'ascending' } = {
    mapFn: (a, b) => Number(a) - Number(b),
    direction: 'ascending'
  }
) => {
  return arr.sort((a, b) => options.mapFn(a, b) * (options.direction === 'ascending' ? 1 : -1))
}
