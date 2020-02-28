//
//
// —————————————— 使用数组的集合算法 ——————————————
//
const trim = <T>(arr: T[]) =>
  arr.filter(item => item !== undefined && item !== null) as Exclude<T, undefined | null>[]

//
//
// —————————————— 创建数组 ——————————————
//
const createArray = (config: { repeating?: unknown; count?: number } = {}) =>
  Array(config.count).fill(config.repeating)
const createRange = (
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
const removeByItem = <T>(array: T[], item: T) => array.splice(array.indexOf(item), 1)
const removeByIndex = <T>(array: T[], index: number) => array.splice(index, 1)
const removeAllItems = <T>(array: T[]) => array.splice(0, array.length)
const hasSameItems = (arrA: unknown[], arrB: unknown[]) =>
  arrA.every((itemA, idx) => itemA === arrB[idx]) //TODO: 这里的全等只是个临时措施，需要写个深层递归的全等

//
//
// ———————————— 包装类 ——————————————
//
class _UArray<T> {
  constructor(private arr: T[]) {}
  get value() {
    return this.arr
  }
  get length() {
    return this.arr.length
  }
  get lastIndex() {
    return this.arr.length - 1
  }
  get isEmpty() {
    return this.arr.length === 0
  }

  // self开头，代表返回的依旧是同类型
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any) {
    return new _UArray(this.arr.map(callbackfn, thisArg))
  }
  trim() {
    return new _UArray(
      this.arr.filter(item => item !== undefined && item !== null) as Exclude<
        T,
        undefined | null
      >[],
    )
  }

  // trim = trim.bind(this, this.arr)
  removeByItem = removeByItem.bind(this, this.arr)
  removeByIndex = removeByIndex.bind(this, this.arr)
  removeAllItems = removeAllItems.bind(this, this.arr)
  hasSameItems = hasSameItems.bind(this, this.arr)
}
export const UArray = <T>(arr: T[]) => new _UArray(arr)
UArray.trim = trim
UArray.createArray = createArray
UArray.createRange = createRange
UArray.removeByItem = removeByItem
UArray.removeByIndex = removeByIndex
UArray.removeAllItems = removeAllItems
UArray.hasSameItems = hasSameItems

//
//
// ———————————— test ——————————————
//
console.log(UArray.trim([2, 4, 1, 3, undefined]))
console.log(UArray([2, 4, 1, 3, undefined]).removeAllItems())
